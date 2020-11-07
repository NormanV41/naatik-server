import { Document, model, Schema } from 'mongoose';

export interface IPreviewPost extends Document {
  imageFileName: string;
  title: string;
  date: Date;
  author: string;
  paragraph: string;
  active: boolean;
  post?: string;
}

const previewPostSchema = new Schema<IPreviewPost>({
  imageFileName: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'author' },
  paragraph: { type: String, required: true },
  active: { type: Boolean, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'post' }
});

export const previewPostModel = model<IPreviewPost>(
  'preview-post',
  previewPostSchema
);
