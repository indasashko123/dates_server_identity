


export class ApiError extends Error {
    status : number | string;
    errors : any[];

    constructor(status? : number | string, message? : string, errors? : any[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static Unathorized() : ApiError {
        return new ApiError(401,"Unathorized error");
    }

    static BadRequest(message? : string, errors? : any[]) : ApiError {
        return new ApiError(400, message, errors);
    }

    static InternalError(errors? : any[]) : ApiError {
        return new ApiError(500, "Internal Server Error", errors);
    }

    static Forbidden(errors? : any[]) : ApiError {
        return new ApiError(403,"No access", errors);
    }

    static NotFound (errors? : any[]) : ApiError {
        return new ApiError(404, "Not found", errors);
    }
}