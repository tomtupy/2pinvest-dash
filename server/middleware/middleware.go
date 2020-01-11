package middleware

import (
    //"context"
    "encoding/json"
    "fmt"
    "os"
    "net/http"
    "io/ioutil"
    "strings"

    "../models"
    //"github.com/gorilla/mux"

)

const StatusCodeSuccess = 0
const StatusCodeError = -1

// create connection with mongo db
func init() {

}

func WebGetRequestToString(response models.ServiceGetResponse) string {
    b_err, err := json.Marshal(response)
    _ = err //ignore any marshal errors for now
    return string(b_err)
}

func WebGetRequest(url string) models.GetResponse {
    result := models.GetResponse{StatusCodeError, ""}
    resp, err := http.Get(url)
    if err != nil {
        result.Response = err.Error()
        return result
    }

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        result.Response = err.Error()
        return result
    }

    result.Response = string(body)
    result.StatusCode = StatusCodeSuccess
    return result
}   

// getAirflowStatus get pings airflow app
func GetAirflowStatus(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
    w.Header().Set("Access-Control-Allow-Origin", "*")

    airflow_host := ""
    airflow_port := ""
    exists := false
    ap_exists := false
    result := models.ServiceGetResponse{airflow_host, airflow_port, StatusCodeError, ""}

    airflow_host, exists = os.LookupEnv("AIRFLOW_HOST")
    if !exists {
        result.Response = "AIRFLOW_HOST must be specified!"
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }
    airflow_port, ap_exists = os.LookupEnv("AIRFLOW_PORT")
    if !ap_exists {
        result.Response = "AIRFLOW_PORT must be specified!"
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }
    result.Host = airflow_host
    result.Port = airflow_port

    response := WebGetRequest(fmt.Sprintf("http://%s:%s/api/experimental/latest_runs", airflow_host, airflow_port))

    result.Response = response.Response
    result.StatusCode = response.StatusCode
    json.NewEncoder(w).Encode(WebGetRequestToString(result))
}



// GetKafkaStatus pings kafka service
func GetKafkaStatus(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
    w.Header().Set("Access-Control-Allow-Origin", "*")

    kafka_host := ""
    kafka_rest_port := ""
    kafka_connectors_port := ""
    exists := false
    kr_exists := false
    kc_exists := false


    result := models.ServiceGetResponse{kafka_host, kafka_rest_port, StatusCodeError, ""}

    kafka_host, exists = os.LookupEnv("KAFKA_HOST")
    if !exists {
        result.Response = "KAFKA_HOST must be specified!"
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }
    kafka_rest_port, kr_exists = os.LookupEnv("KAFKA_REST_PORT")
    if !kr_exists {
        result.Response = "KAFKA_REST_PORT must be specified!"
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }
    kafka_connectors_port, kc_exists = os.LookupEnv("KAFKA_CONNECTORS_PORT")
    if !kc_exists {
        result.Response = "KAFKA_CONNECTORS_PORT must be specified!"
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }
    result.Host = kafka_host
    result.Port = kafka_rest_port

    // 1. Get brokers
    response := WebGetRequest(fmt.Sprintf("http://%s:%s/topics", kafka_host, kafka_rest_port))
    if response.StatusCode != StatusCodeSuccess {
        result.Response = response.Response
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }

    // create array from topic list response
    all_topics := make([]string,0)
    json.Unmarshal([]byte(response.Response), &all_topics)
    fmt.Printf("All Kafka Topics: %#v", all_topics)

    var topics []string
    // remove internal topics
    for _, element := range all_topics {
        if !strings.HasPrefix(element, "_") && !strings.HasPrefix(element, "docker-connect") {
            topics = append(topics, fmt.Sprintf("\"%s\"", element))
        } 
    }

    fmt.Printf("Kafka User Topics: %#v", topics)

    // 2. Get connectors
    response = WebGetRequest(fmt.Sprintf("http://%s:%s/connectors", kafka_host, kafka_connectors_port))
    if response.StatusCode != StatusCodeSuccess {
        result.Response = response.Response
        json.NewEncoder(w).Encode(WebGetRequestToString(result))
        return
    }

    // create array from topic list response
    connectors := make([]string,0)
    json.Unmarshal([]byte(response.Response), &connectors)
    fmt.Printf("Kafka Connectors: %#v", connectors)

    var connector_statuses []string
    for _, element := range connectors {
        response = WebGetRequest(fmt.Sprintf("http://%s:%s/connectors/%s/status", kafka_host, kafka_connectors_port, element))
        if response.StatusCode != StatusCodeSuccess {
            result.Response = response.Response
            json.NewEncoder(w).Encode(WebGetRequestToString(result))
            return
        }

        var kafka_connector_status models.KafkaConnector
        json.Unmarshal([]byte(response.Response), &kafka_connector_status)

        fmt.Println(kafka_connector_status)
        c_resp, c_err := json.Marshal(kafka_connector_status)
        _ = c_err //ignore any marshal errors for now
        connector_statuses = append(connector_statuses, string(c_resp))
    }

    fmt.Println(connector_statuses)
    result.Response = fmt.Sprintf("{\"topics\": [%s], \"connectors\": [%s]}", strings.Join(topics,", "), strings.Join(connector_statuses,", "))
    result.StatusCode = StatusCodeSuccess

    json.NewEncoder(w).Encode(WebGetRequestToString(result))
}
