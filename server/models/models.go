package models

type GetResponse struct {
	StatusCode int8
	Response string
}

type ServiceGetResponse struct {
	Host string
	Port string
	StatusCode int8
	Response string
}

type KafkaConnectorStatus struct {
    State string
    Worker_Id string
}

type KafkaConnector struct {
    Name string
    Connector KafkaConnectorStatus
    Pointer *string `json:"-"`
}