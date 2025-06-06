import mongoose, { Document, Schema } from 'mongoose';

interface IDestination extends Document {
  name: string;
  state: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  bestTime: string;
  highlights: string[];
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<IDestination>({
  name: { type: String, required: true },
  state: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  bestTime: { type: String, required: true },
  highlights: { type: [String], required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const Destination = mongoose.model<IDestination>('Destination', destinationSchema);

export type { IDestination };
export default Destination;
