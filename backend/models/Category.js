import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: {
      type: String,
      required: true,
      minlength: [3, 'title must be greater than 3 character.'],
    },
  },
  {
    timestamps: true,
  }
);

// Unique constraint on user_id and title
categorySchema.index({ userId: 1, title: 1 }, { unique: true });

const Category = model('Category', categorySchema);
export default Category;
