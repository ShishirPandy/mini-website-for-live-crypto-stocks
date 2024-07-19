import mongoose, { Schema, Document } from 'mongoose';

interface IStock extends Document {
  name: string;
  symbol: string;
  price: number;
  timestamp: Date;
}

const StockSchema: Schema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Stock = mongoose.model<IStock>('Stock', StockSchema);

export default Stock;
