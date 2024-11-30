import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    tags: {
      type: [String],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IItem>('Item', ItemSchema); 