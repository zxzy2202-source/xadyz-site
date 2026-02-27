/**
 * 统一查询层：分页、搜索、错误处理
 */

export interface ListParams {
  page?: number;
  pageSize?: number;
  q?: string;
}

export interface ListResult<T> {
  data: T[];
  total?: number;
  page: number;
  pageSize: number;
  error?: string;
}

export interface GetResult<T> {
  data: T | null;
  error?: string;
}

export interface MutateResult<T = void> {
  data?: T;
  error?: string;
}

export function formatError(e: unknown): string {
  if (e && typeof e === 'object' && 'message' in e && typeof (e as { message: unknown }).message === 'string') {
    return (e as { message: string }).message;
  }
  return String(e);
}
