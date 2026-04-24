package services

import (
	"backend/models"
	"fmt"
	"net/smtp"
	"os"
) 

func SendEmail(data models.Email) error {
	from := os.Getenv("EMAIL_USER")
password := os.Getenv("EMAIL_PASSWORD")

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	auth := smtp.PlainAuth("" , from , password , smtpHost)
	message := []byte(
		"From: " + from + "\r\n" +
		"To: " + from + "\r\n" +
		"Subject: New Contact Message \r\n\r\n" +
		"Name: " + data.Name + "\n" +
		"Email: " +data.Email + "\n" +
		"Number: " + data.Number + "\n" + 
		"Message: " + data.Message,
	)
	err := smtp.SendMail(
		smtpHost + ":" + smtpPort,
		auth,
		from,
		[]string{from},
		message,
	)
	if err != nil{
		fmt.Println("Error sending email" ,err)
		return err
	}
	fmt.Println("Email sent successfully")
	return nil
}