import axios from 'axios';
import Stock from '../models/Stock';

const coins = ['ETH', 'USDT', 'BTC', 'BNB', 'SOL']; // Example coins
const Polling_Interval = 5000; // Polling interval in milliseconds

const fetchdata = async () => {
  for (const stock of coins) {
    try {
      const response = await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "63b448f7-9bcb-45a9-87de-089260d9abd6",
        }),
        body: JSON.stringify({
          currency: "USD",
          code: stock,
          meta: true,
        }),
      });
      
      const data = await response.json();
      const price = data.rate;

      if (typeof price !== 'undefined') {
        const stockData = new Stock({
          name: data.name,
          symbol: stock,
          price: price,
          timestamp: new Date(),
        });

        await stockData.save();
        console.log(`Saved data for ${stock}`);
      } else {
        console.error(`No price data available for ${stock}`);
      }
    } catch (error) {
      console.error(`Error fetching data for: ${stock}`, error);
    }
  }
};

setInterval(fetchdata, 5000);

export { fetchdata };
