class ErrorHandler extends Error {
    constructor(message, errorCode) {
        super(message);
        this.statusCode = errorCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500
    return res.status(err.statusCode).json({
        success: "Failed",
        message: err.message
    })
}

export default ErrorHandler;