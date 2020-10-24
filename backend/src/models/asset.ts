import * as mongoose from 'mongoose';

export interface IAsset extends mongoose.Document {
    name: string;
    price: number;
    quantity: number;
    user_id: string;
    purchaseDate: Date;
    
    
  }

const AssetSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },

  user_id: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

  },

  addedAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IAsset>('Asset', AssetSchema);