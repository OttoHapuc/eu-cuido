import axiosInstance from "./axiosInstance";

interface ApiRequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const apiRequest = async <T = any>({
  method,
  url,
  data,
  params,
  headers,
}: ApiRequestOptions): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    // console.error("Erro na API:", error.response?.data || error.message);
    throw error.response?.data || error.message || "Erro desconhecido";
  }
};
