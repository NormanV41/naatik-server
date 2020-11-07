import { Schema, model, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  telephone: string;
  message: string;
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  message: { type: String }
});

export const contactModel = model<IContact>('contact', contactSchema);
