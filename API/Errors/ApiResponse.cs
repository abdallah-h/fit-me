namespace API.Errors {
    public class ApiResponse {
        public ApiResponse(int statusCode, string message = null) {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode) {
            return statusCode
            switch {
                400 => "Bad Request",
                    401 => "Unauthorized Request",
                    404 => "The requested page could not be found",
                    500 => "Internal Server Error",
                    _ => null
            };
        }
    }
}