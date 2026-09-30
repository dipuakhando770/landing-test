import paymentVerifyHandler from './payment/verify';

export default async function handler(req: any, res: any) {
  return paymentVerifyHandler(req, res);
}
