const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { URL_API, URL_API_PROD, TOKEN_API, ASSETS_TO_GET, PERIOD_ID_HISTORY } = process.env;

const app = express();

app.get('/getMarketInfo', cors(), async (req, res) => {
  try {
    console.log(URL_API);
    console.log(TOKEN_API);
    console.log(ASSETS_TO_GET);
    const { data } = await axios.get(`${URL_API}/assets?filter_asset_id=${ASSETS_TO_GET}`, {
      headers: {
        'X-CoinAPI-Key': TOKEN_API,
      },
    });
    const assets = data.map((asset) => {
      return {
        id: asset.asset_id,
        name: asset.name,
        priceUsd: asset.price_usd,
      };
    });
    return res.status(200).json({
      ok: true,
      assets,
    });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({
      ok: false,
      message: err,
    });
  }
});

app.get('/getHistoryAsset/:asset', cors(), async (req, res) => {
  try {
    const date = new Date();
    const timeEnd = date.toISOString();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);
    const timeStart = sevenDaysAgo.toISOString();
    const { data } = await axios.get(
      `${URL_API_PROD}/ohlcv/${req.params.asset}/USD/history?period_id=${PERIOD_ID_HISTORY}&time_start=${timeStart}&time_end=${timeEnd}&limit=1000`,
      {
        headers: {
          'X-CoinAPI-Key': TOKEN_API,
        },
      }
    );

    const historyAsset = data.map((history) => {
      return {
        periodStart: history.time_period_start,
        highPrice: history.price_high,
      };
    });
    return res.status(200).json({
      ok: true,
      historyAsset,
    });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({
      ok: false,
      message: err,
    });
  }
});

module.exports = app;
