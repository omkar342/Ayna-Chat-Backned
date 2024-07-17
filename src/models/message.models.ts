import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: { type: String, required: true },
    messageSender: { type: Schema.Types.ObjectId, ref: 'User' },
    senderType: { type: String, enum: ["user", "socket"] },
    createdAt: {type: Date, default: Date.now},
});

const Message = mongoose.model('Message', messageSchema)
module.exports = Message;