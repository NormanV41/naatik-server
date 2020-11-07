import { Document, Schema, model } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  jobTitle: string;
  image: string;
}

const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  image: { type: String, required: true }
});

export const authorModel = model<IAuthor>('author', authorSchema);
