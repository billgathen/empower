# Makefile
# Usage:
#   make dev        # run with air (hot reload)
#   make run        # run without reload
#   make build      # build binary into ./bin
#   make test       # run tests
#   make lint       # gofmt + go vet
#   make tidy       # go mod tidy

SHELL := /bin/bash

APP_NAME := empower
CMD_DIR  := ./cmd/web
BIN_DIR  := ./bin
BIN      := $(BIN_DIR)/$(APP_NAME)

GO       ?= go
AIR      ?= air

.PHONY: help dev run build test lint tidy clean

help:
	@echo "Targets:"
	@echo "  make dev              Run with air (hot reload)"
	@echo "  make run              Run server (no reload)"
	@echo "  make build            Build binary -> $(BIN)"
	@echo "  make test             Run tests"
	@echo "  make lint             gofmt + go vet"
	@echo "  make tidy             go mod tidy"
	@echo "  make clean            Remove ./bin"
	@echo ""
	@echo "Vars:"
	@echo "  APP_NAME=myapp"
	@echo "  MYSQL_DSN='...'"

dev:
	@command -v $(AIR) >/dev/null 2>&1 || { echo "air not found. Install: go install github.com/air-verse/air@latest"; exit 1; }
	$(AIR)

run:
	$(GO) run $(CMD_DIR)

build: $(BIN)

$(BIN):
	@mkdir -p $(BIN_DIR)
	CGO_ENABLED=0 $(GO) build -o $(BIN) $(CMD_DIR)

test:
	$(GO) test ./...

lint:
	$(GO) fmt ./...
	$(GO) vet ./...

tidy:
	$(GO) mod tidy

clean:
	rm -rf $(BIN_DIR)
