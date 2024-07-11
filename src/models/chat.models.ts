import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: 'User' },
    receiver: {type: Schema.Types.ObjectId, ref: 'User' },
    message: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const Chat = mongoose.model('User', chatSchema)
module.exports = Chat;