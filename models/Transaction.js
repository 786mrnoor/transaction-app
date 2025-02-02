import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
    {
        userId: { type: String, required: true, ref: 'User' },
        categoryId: { type: String, required: true, ref: 'Category', },
        type: { type: String, enum: ['Cr', 'Dr'], default: 'Dr' },
        status: { type: String, enum: ['completed', 'pending'], default: 'completed' },
        amount: { type: Number, default: 0, min: 0},
        description: { type: String },
    },
    {
        timestamps: true
    }
);

// Create model
const Transaction = model('Transaction', transactionSchema);
export default Transaction;