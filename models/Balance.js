import mongoose, { Schema, model } from 'mongoose';

const balanceSchema = new Schema(
    {
        _id: { type: mongoose.ObjectId, required: true, ref: 'User', },
        credit: { type: Number, default: 0 },
        debit: { type: Number, default: 0 },
        pendingCredit: { type: Number, default: 0 },
        pendingDebit: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Balance = model('Balance', balanceSchema);
export default Balance;
