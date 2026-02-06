// Package assistant implements dynamic prompts for the OpenAI API
package assistant

import (
	"context"
	"errors"
	"os"
	"strings"

	"github.com/microcosm-cc/bluemonday"
	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
)

func IsAuthorized() bool {
	_, exists := os.LookupEnv("OPENAI_API_KEY")
	return exists
}

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

	content := resp.Choices[0].Message.Content
	return markdownToSafeHTML(content)
}

var md = goldmark.New(
	goldmark.WithExtensions(extension.GFM),
	goldmark.WithParserOptions(parser.WithAutoHeadingID()),
)

var sanitizer = func() *bluemonday.Policy {
	p := bluemonday.UGCPolicy()
	p.AddTargetBlankToFullyQualifiedLinks(true)
	p.RequireNoFollowOnLinks(true)
	return p
}()

func markdownToSafeHTML(markdown string) (string, error) {
	markdown = strings.TrimSpace(markdown)

	var b strings.Builder
	if err := md.Convert([]byte(markdown), &b); err != nil {
		return "", err
	}

	unsafeHTML := b.String()
	safeHTML := sanitizer.Sanitize(unsafeHTML)
	return safeHTML, nil
}
