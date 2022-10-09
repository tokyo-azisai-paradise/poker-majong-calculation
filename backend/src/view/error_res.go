package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// 400 BadRequest
func RequestError(c *gin.Context, msg string) {
	c.JSON(http.StatusBadRequest, gin.H{
		"message": msg,
	})
}
