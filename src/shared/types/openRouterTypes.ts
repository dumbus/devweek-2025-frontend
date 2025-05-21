export type IOpenRouterModel = 
  'meta-llama/llama-3.3-8b-instruct:free' |
  'google/gemma-3n-e4b-it:free' |
  'deepseek/deepseek-prover-v2:free'

export interface IOpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface IOpenRouterRequest {
  model: IOpenRouterModel;
  messages: IOpenRouterMessage[];
}

export interface IOpenRouterResponse {
  id: string;
  model: string;
  choices: {
    message: IOpenRouterMessage;
  }[];
}
