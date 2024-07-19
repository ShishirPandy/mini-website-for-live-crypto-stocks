"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
const stockServices_1 = require("./services/stockServices");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://shishir17recruit:3PugotTufCrYzxbJ@cluster0.njlyejw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Replace with your MongoDB connection string
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(express_1.default.json());
app.use('/api', stockRoutes_1.default);
// Initialize polling
(0, stockServices_1.fetchdata)(); // To run immediately on startup
setInterval(stockServices_1.fetchdata, 5000); // To run at intervals
exports.default = app;
