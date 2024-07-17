import { Request, Response } from "express";

const Chat = require("../models/chat.models");
const Message = require("../models/message.models");

const getSavedChatController = async (req: Request, res: Response) => {
  try {
    const { chatCreator } = req.body;

    if (!chatCreator) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    const chat = await Chat.find({ chatCreator }).populate("messages");

    if (!chat) {
      return res.status(404).json({ message: "No Chats Available!" });
    }

    res.status(200).json({
      success: true,
      message: "Chat saved successfully!",
      chatData: chat,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveChatController = async (req: Request, res: Response) => {
  try {
    const { chatName, chatCreator } = req.body;

    if (!chatCreator || !chatName) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    const chat = new Chat({
      chatName,
      chatCreator,
    });

    const savedChat = await chat.save();

    res.status(201).json({
      success: true,
      message: "Chat saved successfully!",
      chat: savedChat,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveNewMeesageController = async (req: Request, res: Response) => {
  try {
    const { message, sender, associatedChat, senderType } = req.body;

    if (!message || !sender || !associatedChat || !senderType) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }

    const newMessage = new Message({
      message,
      messageSender: sender,
      senderType,
    });

    const newlySavedMessage = await newMessage.save();

    const updatedChat = await Chat.findOneAndUpdate(
      { _id: associatedChat },
      { $push: { messages: newlySavedMessage._id } },
      { new: true },
      { upsert: true }
    ).populate("messages");

    res.status(200).json({
      success: true,
      message: "Chat saved successfully!",
      chat: updatedChat,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { saveChatController, saveNewMeesageController, getSavedChatController };
