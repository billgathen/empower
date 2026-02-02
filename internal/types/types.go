/* Package types supplies shared types for application */
package types

type SuggestionType string

const SuggestionGoal SuggestionType = "goal"

type SuggestRequest struct {
	Type      SuggestionType `json:"type"`
	UserInput string         `json:"userInput"`
}

type SuggestResponse struct {
	Suggestion string `json:"suggestion"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
