import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatCreator: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    createdAt: {type: Date, default: Date.now}
});

const Message = mongoose.model('User', messageSchema)
module.exports = Message;