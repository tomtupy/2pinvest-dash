package router

import (
	"../middleware"
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/service/airflow/status", middleware.GetAirflowStatus).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/service/kafka/status", middleware.GetKafkaStatus).Methods("GET", "OPTIONS")
	return router
}
