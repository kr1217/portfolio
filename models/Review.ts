import mongoose from 'mongoose';

export interface IReview extends mongoose.Document {
  name: string;
  company?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new mongoose.Schema<IReview>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  company: {
    type: String,
    maxlength: [60, 'Company cannot be more than 60 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
    maxlength: [500, 'Comment cannot be more than 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
