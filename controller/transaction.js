import Transaction from '../models/Transaction.js';
import { addBalance, deleteBalance, putBalance } from './balance.js';

export async function getAll(req, res) {
    try {
        let filter = buildQuery(req.query, req.user.id);
        const results = await Transaction.find(filter);

        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
}

export async function get(req, res) {
    try {
        let _id = req.params.id;
        let result = await Transaction.findOne({ _id, userId: req.user.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
}

export async function add(req, res) {
    try {
        let tr = req.body;
        let userId = req.user.id;
        let transaction = new Transaction({
            ...tr,
            userId
        });
        await transaction.save();

        await addBalance(tr, userId);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
}

export async function put(req, res) {
    try {
        let tr = req.body;
        delete tr._id;
        // store transaction after validation
        let _id = req.params.id;
        let userId = req.user.id;

        const oldTr = await Transaction.findOne({ _id, userId });
        const newTr = await Transaction.findOneAndUpdate(
            { _id, userId },
            { $set: tr },
            { new: true, runValidators: true }
        )
        putBalance(oldTr, newTr, userId);

        res.status(201).json(newTr);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
        // console.log(error);

    }
}


export async function deleteTransaction(req, res) {
    try {
        let userId = req.user.id;
        let _id = req.params.id;

        const transaction = await Transaction.findOneAndDelete({ _id, userId });
        if (!transaction) {
            return res.status(204).json({
                id,
                isDeleted: true,
                deletedOn: new Date().toISOString()
            });
        }

        await deleteBalance(transaction)
        res.status(200).json({
            _id,
            isDeleted: true,
            deletedOn: new Date().toUTCString()
        });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
        // console.log(error);
        return;
    }
}

function buildQuery(query, userId) {
    const { startDate, endDate, type, status, category, date } = query;

    let filter = { userId };

    // Date range filter
    if (startDate && endDate) {
        let lastDate = new Date(endDate);
        lastDate.setDate(lastDate.getDate() + 1);
        filter[date ? date : 'updatedAt'] = {
            $gte: new Date(startDate), // Greater than or equal to startDate
            $lte: lastDate    // Less than or equal to endDate
        };
    }

    // Type filter (if not "All")
    if (type && type !== 'All') {
        filter.type = type;
    }

    // Status filter (if not "All")
    if (status && status !== 'All') {
        filter.status = status;
    }

    // Category filter (if not "All")
    if (category && category !== 'All') {
        filter.categoryId = category;
    }
    return filter;
}
