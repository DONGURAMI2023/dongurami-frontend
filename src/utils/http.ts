import axios, { AxiosRequestConfig } from "axios";

/*
예시 : 
getApi("challenges");
const headers = {
  ACCESS : "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJzd"
}
getApi("challenges", headers);
*/

const BACKEND_URL =
  "http://ec2-13-125-174-152.ap-northeast-2.compute.amazonaws.com/";

interface ApiParams {
  url: string;
  headers?: Record<string, string>;
  params?: any;
}

interface PostApiParams extends ApiParams {
  requestBody: any;
}

interface PutApiParams extends PostApiParams {}

export const getApi = async <T>({
  url,
  headers,
  params,
}: ApiParams): Promise<T> => {
  const response = await axios.get<T>(`${BACKEND_URL}${url}`, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response.data;
};

export const postApi = async <T>({
  url,
  requestBody,
  headers,
  params,
}: PostApiParams): Promise<T> => {
  const response = await axios.post(`${BACKEND_URL}${url}`, requestBody, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response.data;
};

export const putApi = async <T>({
  url,
  requestBody,
  headers,
  params,
}: PutApiParams): Promise<T> => {
  const response = await axios.put(`${BACKEND_URL}${url}`, requestBody, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response.data;
};

export const patchApi = async <T>({
  url,
  requestBody,
  headers,
  params,
}: PutApiParams): Promise<T> => {
  const response = await axios.patch(`${BACKEND_URL}${url}`, requestBody, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response.data;
};

export const deleteApi = async <T>({ url, headers }: ApiParams): Promise<T> => {
  const response = await axios.delete(`${BACKEND_URL}${url}`, {
    headers,
  } as AxiosRequestConfig);

  return response.data;
};
