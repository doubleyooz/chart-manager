import * as mongoose from 'mongoose';

export interface IStock extends mongoose.Document {
  name: string;
  price: number;
  quantity: number;
  purchaseDate: Date;
    
    
}

const StockSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },

  users_id:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

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