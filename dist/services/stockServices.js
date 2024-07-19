"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchdata = void 0;
const Stock_1 = __importDefault(require("../models/Stock"));
const coins = ['ETH', 'USDT', 'BTC', 'BNB', 'SOL']; // Example coins
const Polling_Interval = 5000; // Polling interval in milliseconds
const fetchdata = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const stock of coins) {
        try {
            const response = yield fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
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
            const data = yield response.json();
            const price = data.rate;
            if (typeof price !== 'undefined') {
                const stockData = new Stock_1.default({
                    name: data.name,
                    symbol: stock,
                    price: price,
                    timestamp: new Date(),
                });
                yield stockData.save();
                console.log(`Saved data for ${stock}`);
            }
            else {
                console.error(`No price data available for ${stock}`);
            }
        }
        catch (error) {
            console.error(`Error fetching data for: ${stock}`, error);
        }
    }
});
exports.fetchdata = fetchdata;
setInterval(fetchdata, 5000);
