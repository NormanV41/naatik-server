import { Document, Schema, model } from 'mongoose';

export interface IVideoCarousel extends Document {
  url: string;
  title: string;
  description: string;
  active: boolean;
}

const videoCarouselSchema = new Schema<IVideoCarousel>({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true }
});

export const videoCarouselModel = model<IVideoCarousel>(
  'video-carousel',
  videoCarouselSchema
);
