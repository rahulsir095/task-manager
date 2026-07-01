export const errorHandler = (err, req, res, next) => {
    console.error("💥 Error Caught by Middleware:", err.stack);

    // Default server error values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle Mongoose Bad ObjectId 
    if (err.name === "CastError") {
        statusCode = 404;
        message = `Resource not found. Invalid format for field: ${err.path}`;
    }

    // Handle Mongoose Validation Errors 
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(", ");
    }

    // Handle Mongoose Duplicate Key Error 
    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};