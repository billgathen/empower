// Package ai provides access to specific prompts for the OpenAI API
package ai

import (
	"context"
	"errors"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
)

func Call(ctx context.Context, prompt string) (string, error) {
	apiKey, exists := os.LookupEnv("OPENAI_API_KEY")
	if !exists {
		return "", errors.New("set OPENAI_API_KEY in your shell or add to .env")
	}

	client := openai.NewClient(option.WithAPIKey(apiKey))
	params := openai.ChatCompletionNewParams{
		Model: openai.ChatModelGPT5_2,
		Messages: []openai.ChatCompletionMessageParamUnion{
			openai.UserMessage(prompt),
		},
	}

	resp, err := client.Chat.Completions.New(ctx, params)
	if err != nil {
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}
