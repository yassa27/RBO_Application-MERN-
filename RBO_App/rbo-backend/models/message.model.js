const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
{
    messageSender: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    messageContent: String,
    chat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    ],
},
    {
        timestamps: true,
    }
)

const Message = mongoose.model("Message", messageModel);
module.exports = Message;