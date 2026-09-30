import type { IncomingMessage, ServerResponse } from 'http';
import paymentCreateHandler from './payment/create';

export default async function handler(req: any, res: any) {
  return paymentCreateHandler(req, res);
}
