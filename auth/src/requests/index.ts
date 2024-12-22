const BASE_URL = 'http://localhost:3000'; // Substitua pelo URL base da sua API

// Função para pegar o token de autenticação do localStorage
const getAuthToken = (): string => {
  return localStorage.getItem('authToken') || '';
};

// Definição dos tipos de RequestOptions
interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Função genérica para fazer requisições API
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Objeto API com métodos GET, POST, PUT, DELETE usando a função genérica `request`
const api = {
  get: async <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, {
      method: 'GET',
    }),

  post: async <T>(endpoint: string, payload: unknown): Promise<T> =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  put: async <T>(endpoint: string, payload: unknown): Promise<T> =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  delete: async <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, {
      method: 'DELETE',
    }),
};

export default api;
