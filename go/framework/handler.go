// framework/handler.go
package framework

type HandlerFunc[B, Q any] func(*Context)
