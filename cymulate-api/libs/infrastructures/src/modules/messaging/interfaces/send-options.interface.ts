type Context = Record<string, unknown>;


export interface SendOptions {
  to: string;
  from: string;
  subject: string;
  body?: string;
  template?: string;
  context?: Context;
}
