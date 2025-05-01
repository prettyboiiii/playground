// framework/context.go
package framework

import (
	"encoding/json"
	"net/http"
)

type Context struct {
	w   http.ResponseWriter
	req *http.Request
}

func (c *Context) JSON(code int, obj any) {
	c.w.Header().Set("Content-Type", "application/json")
	c.w.WriteHeader(code)
	json.NewEncoder(c.w).Encode(obj)
}

func (c *Context) Bind(obj any) error {
	return json.NewDecoder(c.req.Body).Decode(obj)
}
