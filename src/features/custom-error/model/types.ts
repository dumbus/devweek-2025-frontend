import React from 'react';
import { ErrorType } from 'shared';

export interface ICustomError {
  errorType: ErrorType;
  message?: string | null;
  hasReturnButton?: boolean;
  customButton?: React.ReactNode;
}
