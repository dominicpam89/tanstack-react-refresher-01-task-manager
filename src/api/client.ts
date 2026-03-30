const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/api'

function get<T>(url: string): Promise<T | never> {
  return fetch(`${API_URL}${url}`)
    .then((res) => res.json())
    .catch((err) => console.error(err))
}

function post<T>(url: string, data: unknown) {
  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json() satisfies Promise<T>)
    .catch((err) => console.error(err))
}

function put<T>(url: string, data: unknown) {
  return fetch(`${API_URL}${url}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json() satisfies Promise<T>)
    .catch((err) => console.error(err))
}

function del<T>(url: string) {
  return fetch(`${API_URL}${url}`, {
    method: 'DELETE',
  })
    .then((res) => res.json() satisfies Promise<T>)
    .catch((err) => console.error(err))
}

export const apiClient = { get, post, put, del }
