import * as mongoose from 'mongoose';

export interface IStock extends mongoose.Document {
  name: string;
  price: number;
  quantity: number;
  purchaseDate: Date;
  enterprise_id: mongoose.Schema.Types.ObjectId;  
    
}

const StockSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },

  enterprise_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

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