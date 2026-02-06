package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"

	"github.com/billgathen/empower/internal/api"
	"github.com/billgathen/empower/internal/assistant"
	"github.com/billgathen/empower/internal/middleware"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

// Embed assets
//
//go:embed static
var staticFS embed.FS

func main() {
	_ = godotenv.Load()

	addr := env("ADDR", ":3000")
	staticDir, err := fs.Sub(staticFS, "static")
	if err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()
	r.Use(middleware.Recover)
	r.Use(middleware.Logger)

	r.HandleFunc("/api/assistant/authorized", assistantAuthorized).Methods("GET")
	r.HandleFunc("/api/suggest", api.Suggest).Methods("POST")

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.FS(staticDir))))

	r.HandleFunc("/", func(w http.ResponseWriter, _ *http.Request) {
		index(w, staticDir)
	}).Methods("GET")
	r.HandleFunc("/", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
	}).Methods("HEAD")
	r.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")

	log.Printf("listening on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatal(err)
	}
}

func assistantAuthorized(w http.ResponseWriter, _ *http.Request) {
	if assistant.IsAuthorized() {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
	}
}

func index(w http.ResponseWriter, staticDir fs.FS) {
	b, err := fs.ReadFile(staticDir, "index.html")
	if err != nil {
		http.Error(w, "index not found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Cache-Control", "no-cache")
	w.Write(b)
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func cacheStatic(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Default for static: a bit of caching is fine
		cache := "public, max-age=3600"

		// If filename looks fingerprinted, cache “forever”
		// (simple heuristic: contains a dot-hash-like segment)
		if looksFingerprinted(r.URL.Path) {
			cache = "public, max-age=31536000, immutable"
		}
		w.Header().Set("Cache-Control", cache)
		next.ServeHTTP(w, r)
	})
}

func looksFingerprinted(p string) bool {
	// e.g. /static/app.4f3c2c1a.css
	// quick-n-dirty: at least 3 dots like name.hash.ext
	dots := 0
	for _, ch := range p {
		if ch == '.' {
			dots++
		}
	}
	return dots >= 2
}
