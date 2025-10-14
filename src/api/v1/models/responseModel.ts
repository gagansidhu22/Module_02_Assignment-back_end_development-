// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;    
  error?: string;     
}

//success response type
export type SuccessResponse<T> = ApiResponse<T>;

//error response type
export type ErrorResponse = ApiResponse<null>;
