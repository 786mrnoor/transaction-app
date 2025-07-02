import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category', },
        type: { type: String, enum: ['Cr', 'Dr'], default: 'Dr' },
        status: { type: String, enum: ['completed', 'pending'], default: 'completed' },
        amount: { type: Number, default: 0, min: 0 },
        description: { type: String },
    },
    {
        timestamps: true
    }
);

// Create model
const Transaction = model('Transaction', transactionSchema);
export default Transaction;


// async function migrateData() {
//     try {

//         const documentsToMigrate = await Transaction.find();

//         console.log(documentsToMigrate);
        
//         for (const doc of documentsToMigrate) {
//             try {
//                 doc.markModified('userId');
//                 doc.markModified('categoryId');
//                 await doc.save();
//                 console.log(`Migrated document with _id: ${doc._id}`);
//             } catch (error) {
//                 console.error(`Error migrating document with _id: ${doc._id}. Error: ${error.message}`);
//                 // Handle cases where existing string might not be a valid ObjectId
//                 // You might need to log these and manually inspect/fix them.
//             }
//         }

//         console.log('Data migration complete!');
//     } catch (error) {
//         console.error('Migration error:', error);
//     }
// }

// migrateData();