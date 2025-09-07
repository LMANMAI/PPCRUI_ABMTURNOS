import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

type AllowedMethods = "get" | "post" | "put" | "delete";

interface UseFetchOptions {
  useInitialFetch?: boolean;
  method?: AllowedMethods;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  body?: any;

  //SESSION
  auth?: boolean;
  tokenProvider?: () => string | null;
  unauthorizedHandler?: () => void;
  withCredentials?: boolean;
}

interface UseFetchReturn<T> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  makeRequest: (
    requestOptions?: Partial<UseFetchOptions>
  ) => Promise<T | undefined>;
}

function defaultTokenProvider(): string | null {
  return (
    sessionStorage.getItem("authToken") ||
    localStorage.getItem("authToken") ||
    null
  );
}

function defaultUnauthorizedHandler() {
  try {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
  } catch {}
  // redirijo sin mantener el historial
  window.location.replace("/login");
}

export default function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(
    options.useInitialFetch ?? false
  );
  const [error, setError] = useState<string | null>(null);
  const cancelToken = useRef(false);

  const makeRequest = useCallback(
    async (requestOptions?: Partial<UseFetchOptions>) => {
      setIsLoading(true);
      setError(null);

      const method: AllowedMethods =
        requestOptions?.method || options.method || "get";

      const requestData = requestOptions?.data || options.data || options.body;

      const authEnabled = requestOptions?.auth ?? options.auth ?? true;

      const getToken =
        requestOptions?.tokenProvider ||
        options.tokenProvider ||
        defaultTokenProvider;

      const on401 =
        requestOptions?.unauthorizedHandler ||
        options.unauthorizedHandler ||
        defaultUnauthorizedHandler;

      // headers base
      const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(requestOptions?.headers || {}),
      };

      // Authorization si corresponde
      if (authEnabled && !requestHeaders.Authorization) {
        const token = getToken();
        if (token) requestHeaders.Authorization = `${token}`;
      }

      const axiosConfig: AxiosRequestConfig = {
        url,
        method,
        headers: requestHeaders,
        params: requestOptions?.params || options.params,
        data: requestData,
        withCredentials:
          requestOptions?.withCredentials ?? options.withCredentials,
      };

      try {
        const response = await axios(axiosConfig);
        setData(response.data);
        return response.data as T;
      } catch (err) {
        const axiosError = err as AxiosError<any>;
        // Manejo explícito de 401 sin refresh
        if (axiosError.response?.status === 401) {
          on401();
        }
        setError(axiosError.message || "Error inesperado");
        setData(undefined);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (!cancelToken.current && options.useInitialFetch) {
      makeRequest();
    }
    return () => {
      cancelToken.current = true;
    };
  }, [url, options.useInitialFetch, makeRequest]);

  return { data, isLoading, error, makeRequest };
}
