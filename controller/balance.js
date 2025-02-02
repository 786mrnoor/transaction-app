import Balance from "../models/Balance.js";

export default async function balance(req, res) {
    try {
        const balance = await Balance.findOne({ _id: req.user.id });
        res.status(200).json(balance);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
        // console.log(error);
    }
};

export async function addBalance(tr, _id) {
    let key = findKey(tr);

    await Balance.findOneAndUpdate(
        { _id },
        { $inc: { [key]: tr.amount } },
    );
}

export async function deleteBalance(tr) {
    let key = findKey(tr);
    // console.log(tr);


    await Balance.findOneAndUpdate(
        { _id: tr.userId },
        { $inc: { [key]: -tr.amount } }
    );
}

export async function putBalance(oldTr, newTr, userId) {
    let oldKey = findKey(oldTr);
    let newKey = findKey(newTr);

    if (oldKey === newKey) {
        let newAmount = newTr.amount - oldTr.amount;
        await Balance.findOneAndUpdate(
            { _id: userId },
            { $inc: { [oldKey]: newAmount } }
        );
    } else {
        await Balance.findOneAndUpdate(
            { _id: userId },
            {
                $inc: {
                    [newKey]: newTr.amount,
                    [oldKey]: -oldTr.amount
                }
            }
        );
    }
}

function findKey(tr) {
    let key;
    if (tr.type === 'Cr') {
        if (tr.status === 'completed') {
            key = 'credit';
        } else {
            key = 'pendingCredit';
        }
    } else {
        if (tr.status === 'completed') {
            key = 'debit';
        } else {
            key = 'pendingDebit';
        }
    }
    return key;
}