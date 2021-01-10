const { HISTORY_ASSET, MARKET_INFO, RESPONSE_HISTORY_ASSET, RESPONSE_MARKET_INFO } = require('./mock-models/market-info');
const express = require('express');
const app = express();
const request = require('supertest');
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(require('../../paths/market-info'));
jest.mock('axios');
describe('Market Info test', () => {
  process.env = Object.assign(process.env, {
    URL_API: 'Test-API',
    URL_API_PROD: 'Test-API-PROD',
    TOKEN_API: 'Token API',
    ASSETS_TO_GET: 'BTC;ETH;LTC;BCH',
    PERIOD_ID_HISTORY: '1HRS',
  });
  test('Get Market Info - OK', async () => {
    const resp = {
      ok: true,
      assets: RESPONSE_MARKET_INFO,
    };
    jest.spyOn(axios, 'get').mockResolvedValue({ data: MARKET_INFO });
    const { body } = await request(app).get('/getMarketInfo');
    expect(body).toEqual(resp);
  });

  test('Get Market Info - Error', async () => {
    const resp = {
      ok: false,
      message: 'Error in server',
    };
    jest.spyOn(axios, 'get').mockRejectedValue('Error in server');
    const { body } = await request(app).get('/getMarketInfo');
    expect(body).toEqual(resp);
  });

  test('Get History Asset- OK', async () => {
    const resp = {
      ok: true,
      historyAsset: RESPONSE_HISTORY_ASSET,
    };
    jest.spyOn(axios, 'get').mockResolvedValue({ data: HISTORY_ASSET });
    const { body } = await request(app).get('/getHistoryAsset/BTC');
    expect(body).toEqual(resp);
  });

  test('Get History Asset - Error', async () => {
    const resp = {
      ok: false,
      message: 'Error in server',
    };
    jest.spyOn(axios, 'get').mockRejectedValue('Error in server');
    const { body } = await request(app).get('/getHistoryAsset/BTC');
    expect(body).toEqual(resp);
  });
});
