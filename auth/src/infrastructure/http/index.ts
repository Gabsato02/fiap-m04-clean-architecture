const BASE_URL = 'http://localhost:3000';

const getAuthToken = (): string => {
  return localStorage.getItem('authToken') || '';
};

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

const api = {
  get: async <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, { method: 'GET' }),

  post: async <T>(endpoint: string, payload: unknown): Promise<T> =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(payload) }),

  put: async <T>(endpoint: string, payload: unknown): Promise<T> =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(payload) }),

  delete: async <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, { method: 'DELETE' }),
};

export default api;