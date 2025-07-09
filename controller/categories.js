import Category from '../models/Category.js';
import Transaction from '../models/Transaction.js';

export async function getAll(req, res) {
    try {
        let { id } = req.user;
        const results = await Category.find({ userId: id });
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
        // console.log(error);
        return;
    }
}

export async function add(req, res) {
    try {
        let title = req.body.title;
        const category = new Category({ userId: req.user.id, title })
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (MongoDB error code 11000)
            return res.status(400).json({ error: true, message: 'Title already exists.' });
        }
        res.status(400).json({ error: true, message: error.message });
    }
}

export async function update(req, res) {
    try {
        let id = req.params.id;
        let userId = req.user.id;
        let title = req.body.title;
        const category = await Category.findOneAndUpdate(
            { _id: id, userId },
            { $set: { title } },
            { new: true, runValidators: true }
        );

        res.status(200).json(category);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (MongoDB error code 11000)
            return res.status(400).json({ error: true, message: 'Title already exists.' });
        }
        res.status(400).json({ error: true, message: error.message });
        // console.log(error);
        return;
    }
}

export async function deleteCategory(req, res) {
    try {
        let userId = req.user.id;
        let _id = req.params.id;
        const transaction = await Transaction.findOne({ categoryId: _id }).exec();
        if (transaction) {
            res.status(400).json({ error: true, message: 'Category is in use. Delete all transactions first.' });
        }
        else {
            await Category.findOneAndDelete({ userId, _id });

            res.status(200).json({
                _id,
                isDeleted: true,
                deletedOn: new Date().toISOString()
            });
        }
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
        // console.log(error);
        return;
    }
}
