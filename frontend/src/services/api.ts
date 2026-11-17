export const SERVIDOR_URL =
  process.env.EXPO_PUBLIC_SERVIDOR_URL ?? "http://localhost:8080";

const API_URL = `${SERVIDOR_URL}/api/v1`;
const TIMEOUT_MS = 10000;

export interface PaginaResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

async function requisicao<T>(
  metodo: string,
  endpoint: string,
  corpo?: unknown,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
      signal: controller.signal,
    });
  } catch {
    throw new ApiError(0, "Falha de conexão com o servidor");
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `${metodo} ${endpoint} falhou com status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function get<T>(endpoint: string): Promise<T> {
  return requisicao<T>("GET", endpoint);
}

export function post<T>(endpoint: string, corpo: unknown): Promise<T> {
  return requisicao<T>("POST", endpoint, corpo);
}

export function put<T>(endpoint: string, corpo: unknown): Promise<T> {
  return requisicao<T>("PUT", endpoint, corpo);
}

export function del<T = void>(endpoint: string): Promise<T> {
  return requisicao<T>("DELETE", endpoint);
}

// Mensagem compreensível para mostrar na tela.
export function descreverErro(erro: unknown): string {
  if (erro instanceof ApiError) {
    if (erro.status === 0) {
      return "Não foi possível conectar ao servidor. Verifique se a API está ligada e se o endereço está correto.";
    }
    return `O servidor respondeu com erro (${erro.status}). Tente novamente.`;
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}