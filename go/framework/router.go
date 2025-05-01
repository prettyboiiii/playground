// framework/router.go
package framework

import "net/http"

type pathHandlerRoutes map[string]HandlerFunc[any, any]

type methodPathRoutes map[string]pathHandlerRoutes

type Router struct {
	methodPaths methodPathRoutes // method -> path -> handler
}

func NewRouter() *Router {
	return &Router{methodPaths: make(methodPathRoutes)}
}

func (r *Router) Handle(method, path string, handler HandlerFunc[any, any]) {
	if r.methodPaths[method] == nil {
		r.methodPaths[method] = make(map[string]HandlerFunc[any, any])
	}
	r.methodPaths[method][path] = handler
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	if pathHandlers, ok := r.methodPaths[req.Method]; ok {
		if handler, ok := pathHandlers[req.URL.Path]; ok {
			ctx := &Context{w: w, req: req}
			handler(ctx)
			return
		}
	}

	http.NotFound(w, req)
}
