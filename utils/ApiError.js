class ApiError extends Error{
    constructor(
        statusCode ,
        message,
        stack,
        error=[]
    ){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.error = error

        if(stack)
            this.stack = stack
        else
        Error.captureStackTrace(this, this.constructor)
    }
}

export {ApiError}