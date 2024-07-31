import axios from "axios/index";

import { UrlInterceptor } from "../interseptors/url.interseptor";
import { TokenInterceptor } from "../interseptors/token.interseptor";
import { ResponseInterceptor } from "../interseptors/response.interseptor";

const createApi = () => {
  const axiosInstance = axios.create({
    baseURL: "http://170.187.200.162:8000/api/v1",
  });

  axiosInstance.interceptors.request.use(UrlInterceptor);
  axiosInstance.interceptors.request.use(TokenInterceptor);

  axiosInstance.interceptors.response.use(ResponseInterceptor);

  return axiosInstance;
};

export const AxiosInstance = createApi();
