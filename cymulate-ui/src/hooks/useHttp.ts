import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";

interface UseHttp {
  get: <T>(url: string) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, payload: any) => Promise<AxiosResponse<T>>;
  patch: <T>(url: string, payload: any) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, payload: any) => Promise<AxiosResponse<T>>;
  remove: <T>(url: string) => Promise<AxiosResponse<T>>;
}

export function useHttp(): UseHttp {
  const formatUrl = useCallback((partialUrl: string): string => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${partialUrl}`;
  }, []);

  const get = useCallback(async <T>(url: string): Promise<AxiosResponse<T>> => {
    return axios.get(formatUrl(url));
  }, [formatUrl]);

  const post = <T>(url: string, payload: any): Promise<AxiosResponse<T>> => {
    return axios.post(formatUrl(url), payload);
  };

  const patch = <T>(url: string, payload: any): Promise<AxiosResponse<T>> => {
    return axios.patch(formatUrl(url), payload);
  };

  const put = <T>(url: string, payload: any): Promise<AxiosResponse<T>> => {
    return axios.put(formatUrl(url), payload);
  };

  const remove = <T>(url: string): Promise<AxiosResponse<T>> => {
    return axios.delete(formatUrl(url));
  };

  return { get, post, patch, put, remove };
}
