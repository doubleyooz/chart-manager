import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
   email: string,
   password: string,
    
  }

const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true, select: false },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    addedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IUser>('User', UserSchema);