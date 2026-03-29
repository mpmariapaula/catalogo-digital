import { appEnv } from '../config/env';

function getHeaders(body?: BodyInit | null, init?: HeadersInit) {
  const token = localStorage.getItem('admin_token');
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  return {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...init
  };
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${appEnv.apiUrl}${path}`, {
    ...init,
    headers: getHeaders(init?.body ?? null, init?.headers)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Erro inesperado.' }));
    throw new Error(errorBody.message ?? 'Erro inesperado.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
