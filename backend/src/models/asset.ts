import * as mongoose from 'mongoose';

export interface IAsset extends mongoose.Document {
    name: string;
    price: number;
    quantity: number;
    purchaseDate: Date;
    
  }

const AssetSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },

  addedAt: {
    type: Date,
    default: Date.now,
},
});

export default mongoose.model<IAsset>('Asset', AssetSchema);