import { Document, Schema, model } from 'mongoose';

export interface IPost extends Document {
  headerImage: string;
  preview: string;
  subtitle: string;
  content: string;
}

const postSchema = new Schema<IPost>({
  headerImage: { type: String, required: true },
  preview: { type: Schema.Types.ObjectId, ref: 'preview-post', required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true }
});

export const postModel = model<IPost>('post', postSchema);
