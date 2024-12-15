import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiBaseUrl = process.env.URL_API_BASE;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000, // tempo limite para a requisição (10s)
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // console.log("Enviando requisição para:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // console.error("Erro na resposta da API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
