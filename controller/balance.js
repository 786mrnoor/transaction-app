import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

export default async function balance(req, res) {
    try {
        console.log(req.user);
        
        const balance = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $group: {
                    _id: null, // Group all matched documents into a single group
                    credit: {
                        $sum: {
                            $cond: {
                                if: { $and: [{ $eq: ['$type', 'Cr'] }, { $eq: ['$status', 'completed'] }] },
                                then: '$amount',
                                else: 0
                            }
                        },
                    },
                    debit: {
                        $sum: {
                            $cond: {
                                if: { $and: [{ $eq: ['$type', 'Dr'] }, { $eq: ['$status', 'completed'] }] },
                                then: '$amount',
                                else: 0
                            }
                        },
                    },
                    pendingCredit: {
                        $sum: {
                            $cond: {
                                if: { $and: [{ $eq: ['$type', 'Cr'] }, { $eq: ['$status', 'pending'] }] },
                                then: '$amount',
                                else: 0
                            }
                        },
                    },
                    pendingDebit: {
                        $sum: {
                            $cond: {
                                if: { $and: [{ $eq: ['$type', 'Dr'] }, { $eq: ['$status', 'pending'] }] },
                                then: '$amount',
                                else: 0
                            }
                        },
                    }
                }
            }
        ])
        res.status(200).json(balance[0]);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
        console.error(error);
    }
};
