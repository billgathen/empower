package main

import (
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

func main() {
	_ = godotenv.Load()

	addr := env("ADDR", ":3000")

	r := mux.NewRouter()
	r.HandleFunc("/", index).Methods("GET")

	staticDir := http.Dir("web/static")
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(staticDir)))

	log.Printf("listening on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatal(err)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache")
	http.ServeFile(w, r, "web/static/index.html")
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
