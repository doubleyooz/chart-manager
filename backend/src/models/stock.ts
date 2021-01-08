import * as mongoose from 'mongoose';

export interface IStock extends mongoose.Document {
    name: string;
    price: number;
    quantity: number;
    user_id: string;
    purchaseDate: Date;
    
    
  }

const StockSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },

  addedAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IStock>('Stock', StockSchema);