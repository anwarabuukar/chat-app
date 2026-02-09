import { Schema, model, Types } from "mongoose";
import { CHAT_MODEL, MESSAGE_MODEL, USER_MODEL } from "./constent";

const messageschema = new Schema({
  chatid: {
    type: Types.ObjectId,
    ref: CHAT_MODEL,
  },
  message: {
    type: String,
    required: true,
  },
  outher: {
    type: Types.ObjectId,
    ref: USER_MODEL,
  },
  readstatus: [
    {
      type: Types.ObjectId,
      ref: USER_MODEL,
    },
  ],
});

export default model(MESSAGE_MODEL, messageschema);
