import { useState, useCallback } from "react";
import cookie from "js-cookie";

const server = process.env.REACT_APP_BACKEND + "/api";

export const request = async (url, method = "GET", body) => {
  const isFormData = body instanceof FormData;
  const fetchConfiguration = {
    method,
    headers: {
      "Content-Type": "application/json",
      token: cookie.get("token"),
    },
    credentials: "include",
    body: isFormData ? body : JSON.stringify(body),
  };
  if (isFormData) {
    delete fetchConfiguration.headers["Content-Type"];
  }
  if (method === "GET" || method === "DELETE") {
    delete fetchConfiguration["body"];
  }
  const response = await fetch(url, fetchConfiguration);
  return await response.json();
};

export const _getProducts = async () => {
  return await request(`${server}/product`);
};

export const _getProduct = async ({ id }) => {
  return await request(`${server}/product/${id}`);
};

export const _createProduct = async ({ body }) => {
  return await request(`${server}/product/`, "POST", body);
};

export const _updateProduct = async ({ id, body }) => {
  return await request(`${server}/product/${id}`, "PATCH", body);
};

export const _deleteProduct = async ({ id }) => {
  return await request(`${server}/product/${id}`, "DELETE");
};

export const _loginUser = async ({ body }) => {
  return await request(`${server}/user/login`, "POST", body);
};

export const _getDiscordHook = async () => {
  return await request(`${server}/private/get/discord-hook`);
};

export default function useHttp(request) {
  const [loading, setLoading] = useState(false);

  const _request = useCallback(
    async (params) => {
      setLoading(true);

      const response = await request(params);

      setLoading(false);

      return response;
    },
    [request]
  );

  return [_request, loading];
}
