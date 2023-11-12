import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

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
}: ApiParams): Promise<{ result: T }> => {
  const response = await axios.get<{ result: T }>(`${BACKEND_URL}${url}`, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response.data;
};

export const postApi = async ({
  url,
  requestBody,
  headers,
  params,
}: PostApiParams): Promise<AxiosResponse> => {
  const response = await axios.post(`${BACKEND_URL}${url}`, requestBody, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response;
};

export const putApi = async ({
  url,
  requestBody,
  headers,
  params,
}: PutApiParams): Promise<AxiosResponse> => {
  const response = await axios.put(`${BACKEND_URL}${url}`, requestBody, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response;
};

export const patchApi = async ({
  url,
  requestBody,
  headers,
  params,
}: PutApiParams): Promise<AxiosResponse> => {
  const response = await axios.patch(`${BACKEND_URL}${url}`, requestBody, {
    headers,
    params,
  } as AxiosRequestConfig);

  return response;
};

export const deleteApi = async ({
  url,
  headers,
}: ApiParams): Promise<AxiosResponse> => {
  const response = await axios.delete(`${BACKEND_URL}${url}`, {
    headers,
  } as AxiosRequestConfig);

  return response;
};
