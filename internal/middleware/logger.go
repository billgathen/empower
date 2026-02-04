/* Package middleware adds specific abilities to the main server's request processing */
package middleware

import (
	"log"
	"net/http"
	"strings"
	"time"
)

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		rec := &statusRecorder{
			ResponseWriter: w,
			status:         http.StatusOK, // default if WriteHeader not called
		}

		next.ServeHTTP(rec, r)

		duration := time.Since(start)

		if !strings.Contains(r.URL.Path, "/static/") &&
			!strings.Contains(r.URL.Path, "/health") {
			log.Printf(
				"%s %s %d %s",
				r.Method,
				r.URL.Path,
				rec.status,
				duration,
			)
		}
	})
}
