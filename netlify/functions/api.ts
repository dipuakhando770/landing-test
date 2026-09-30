import express from 'express';
import serverless from 'serverless-http';

import adminHandler from '../../api/admin.js';
import publicConfigHandler from '../../api/public-landing-config.js';
import createPaymentHandler from '../../api/payment/create.js';
import verifyPaymentHandler from '../../api/payment/verify.js';
import callbackPaymentHandler from '../../api/payment/callback.js';
import sendEmailHandler from '../../api/email/send-order-delivery.js';
import metaConversionsHandler from '../../api/meta-conversions.js';
import sitemapHandler from '../../api/sitemap.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bridge = (handler: any) => async (req: express.Request, res: express.Response) => {
  try {
    await handler(req, res);
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

app.all('/api/admin/*', bridge(adminHandler));
app.all('/api/admin', bridge(adminHandler));
app.all('/api/public-landing-config', bridge(publicConfigHandler));
app.all('/api/track-visit', (req, res) => {
  req.query = req.query || {};
  req.query.route = 'track-visit';
  return publicConfigHandler(req, res);
});
app.all('/api/payment-config-status', (req, res) => {
  req.query = req.query || {};
  req.query.route = 'payment-config-status';
  return publicConfigHandler(req, res);
});
app.all('/api/public-pixel-config', (req, res) => {
  req.query = req.query || {};
  req.query.route = 'public-pixel-config';
  return publicConfigHandler(req, res);
});
app.all('/api/create-payment', bridge(createPaymentHandler));
app.all('/api/payment/create', bridge(createPaymentHandler));
app.all('/api/verify-payment', bridge(verifyPaymentHandler));
app.all('/api/payment/verify', bridge(verifyPaymentHandler));
app.all('/api/payment/callback', bridge(callbackPaymentHandler));
app.all('/api/email/send-order-delivery', bridge(sendEmailHandler));
app.all('/api/email/test', bridge(sendEmailHandler));
app.all('/api/meta-conversions', bridge(metaConversionsHandler));
app.all('/api/sitemap', bridge(sitemapHandler));

app.all('/api/*', bridge(publicConfigHandler));

export const handler = serverless(app);
