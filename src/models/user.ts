import { Schema, Types, model } from "mongoose";
import { CHAT_MODEL, USER_MODEL } from "./constent";
const userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  dataofbirth: Date,
  friends: [
    {
      type: Types.ObjectId,
      ref: USER_MODEL,
    },
  ],

  chats: [
    {
      type: Types.ObjectId,
      ref: CHAT_MODEL
    },
  ],
});

export default model(USER_MODEL, userschema);
