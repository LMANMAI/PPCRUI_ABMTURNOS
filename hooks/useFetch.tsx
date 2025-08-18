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
}

interface UseFetchReturn<T> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  makeRequest: (
    requestOptions?: Partial<UseFetchOptions>
  ) => Promise<T | undefined>;
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

      const method = requestOptions?.method || options.method || "get";
      const requestData = requestOptions?.data || options.data || options.body;
      const requestHeaders = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(requestOptions?.headers || {}),
      };

      const axiosConfig: AxiosRequestConfig = {
        url,
        method,
        headers: requestHeaders,
        params: requestOptions?.params || options.params,
        data: requestData,
      };

      try {
        const response = await axios(axiosConfig);
        setData(response.data);
        return response.data as T;
      } catch (err) {
        const axiosError = err as AxiosError;
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
