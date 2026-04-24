package handlers

import (
	"backend/models"
	"backend/services"
	"encoding/json"
	"net/http"
)

func ReceiveEmail(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "only post method are allowed ", http.StatusMethodNotAllowed)
		return
	}
	var email models.Email
	err := json.NewDecoder(r.Body).Decode(&email)
	if err != nil {
		http.Error(w, "can not decode the data", http.StatusInternalServerError)
		return
	}
	err = services.SendEmail(email)
if err != nil {
	http.Error(w, "failed to send email", http.StatusInternalServerError)
	return
}

w.Write([]byte("Email sent successfully"))

}
