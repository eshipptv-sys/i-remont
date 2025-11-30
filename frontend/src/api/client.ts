const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }

  return res.json();
};
