import { ErrorType } from 'shared';

export interface ICustomError {
  errorType: ErrorType;
  message?: string | null;
  hasReturnButton?: boolean;
}
