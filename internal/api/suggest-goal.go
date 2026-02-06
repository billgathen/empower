/* Package api provides API handlers for interaction with external resources */
package api

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"

	"github.com/billgathen/empower/internal/assistant"
	"github.com/billgathen/empower/internal/types"
)

func Suggest(w http.ResponseWriter, r *http.Request) {
	var req types.SuggestRequest
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	if err := dec.Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, types.ErrorResponse{Error: "invalid JSON body"})
		return
	}

	req.UserInput = strings.TrimSpace(req.UserInput)
	if req.UserInput == "" {
		writeJSON(w, http.StatusBadRequest, types.ErrorResponse{Error: "userInput is required"})
		return
	}

	var suggestion = ""
	var err error = nil

	switch types.SuggestionType(req.Type) {
	case types.SuggestionGoal:

		prompt := "You are an expert life coach specializing in goals that get results. " +
			"Suggest improvements to this goal if it is not specific, time-boxed, and actionable. " +
			"Include examples if possible. " +
			"Keep your response under 200 words. " +
			"The goal is: " + req.UserInput

		suggestion, err = assistant.Call(r.Context(), prompt)
	default:
		writeJSON(w, 400, types.ErrorResponse{Error: "invalid type supplied"})
		return
	}

	if err != nil {
		log.Println(err)
		if strings.Contains(err.Error(), "OPENAI_API_KEY") {
			writeJSON(w, 401, types.ErrorResponse{Error: "unauthorized"})
			return
		}
		if errors.Is(err, context.Canceled) {
			writeJSON(w, 499, types.ErrorResponse{Error: "request canceled"})
			return
		}
		if errors.Is(err, context.DeadlineExceeded) {
			writeJSON(w, http.StatusGatewayTimeout, types.ErrorResponse{Error: "upstream timeout"})
			return
		}

		writeJSON(w, http.StatusInternalServerError, types.ErrorResponse{Error: "failed to generate suggestion"})
		return
	}

	writeJSON(w, http.StatusOK, types.SuggestResponse{Suggestion: suggestion})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
