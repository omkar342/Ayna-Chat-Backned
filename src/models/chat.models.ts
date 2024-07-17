import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatName: { type: String, required: true },
    chatCreator: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    createdAt: {type: Date, default: Date.now}
});

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat;