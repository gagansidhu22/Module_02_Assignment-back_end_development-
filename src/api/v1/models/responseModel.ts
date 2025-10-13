// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;          // optional payload for success
  error?: string;    // optional error message
}

// Example success response type
export type SuccessResponse<T> = ApiResponse<T>;

// Example error response type
export type ErrorResponse = ApiResponse<null>;
