import axios from "axios";
import {
  requestHandler,
  successHandler,
  errorHandler,
} from "./requestModifications";
import { API_BASE_URL } from "../constants";

const BASE_URL = API_BASE_URL || "http://api.koerierplatform.nl/api/v1" || "http://13.61.230.38:5001//api/v1";

const httpRequest = (
  config = {
    headers: {
      contentType: "application/json",
    },
  }
) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": config.headers.contentType || "application/json",
    },
  });

  instance.interceptors.request.use(requestHandler);
  instance.interceptors.response.use(successHandler, errorHandler);
  return instance;
};
export default httpRequest();
