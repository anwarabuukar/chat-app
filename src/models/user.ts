import { Schema, Types, model } from "mongoose";
import { CHAT_MODEL, USER_MODEL } from "./constent";
import { hash, compare } from "bcrypt";
import { type } from "node:os";

 export  interface Usertype{
name: string,
username: string,
password: string,
email: string,
verified : boolean,
dataofbirth?: Date,
chats: Types.ObjectId[],
friends:Types.ObjectId[]
}

export type UpdateUserBody = Pick<Usertype, "name"| "username" |"dataofbirth">

const userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "username taken"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email taken"]
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
      select: false,
    },
  ],
  chats: [
    {
      type: Types.ObjectId,
      ref: CHAT_MODEL,
      select: false,
    },
  ],
}, {
  timestamps: true,
  methods: {
    async isPasswordMaching(Plainpassword: string) {
      return compare(Plainpassword, this.password);
    }
  }
});

const SALT_ROUND = 10;

userschema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, SALT_ROUND);
});

export default model(USER_MODEL, userschema);