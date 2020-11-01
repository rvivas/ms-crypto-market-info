const express = require('express');
const axios = require('axios');
const cors = require('cors')

require('dotenv').config();
const { URL_API, TOKEN_API, ASSETS_TO_GET } = process.env;


const app = express();

app.get('/getMarketInfo',cors(), async (req, res) => {
  try {
    console.log(URL_API), console.log(TOKEN_API);
    console.log(ASSETS_TO_GET);
    const { data } = await axios
      .get(`${URL_API}/assets?filter_asset_id=${ASSETS_TO_GET}`, {
        headers: {
          'X-CoinAPI-Key': TOKEN_API,
        },
      })
    const assets = data.map( asset => {
	return {
	  id: asset.asset_id,
	  name: asset.name,
	  priceUsd: asset.price_usd,
	}
    }) 
    return res.status(200).json({
      ok: true,
      assets
    });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({
      ok: false,
      message: 'Internal error in server'
    })
  }
});

module.exports = app
