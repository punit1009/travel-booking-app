import mongoose, { Document, Schema } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  duration: string;
  price: string;
  originalPrice: string;
  cities: string[];
  rating: number;
  reviews: number;
  inclusions: string[];
  highlights: string[];
  image: string;
  description: string;
  bestSeller?: boolean;
  popular?: boolean;
  luxury?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackage>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String, required: true },
  cities: { type: [String], required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviews: { type: Number, required: true, min: 0 },
  inclusions: { type: [String], required: true },
  highlights: { type: [String], required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  bestSeller: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  luxury: { type: Boolean, default: false }
}, { timestamps: true });

const Package = mongoose.model<IPackage>('Package', packageSchema);

export default Package;
