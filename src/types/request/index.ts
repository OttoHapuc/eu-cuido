interface ApiRequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    url: string;
    data?: Record<string, any>;
    params?: Record<string, any>;
    headers?: Record<string, string>;
  }