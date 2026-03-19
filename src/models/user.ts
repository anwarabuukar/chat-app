import { Schema, Types, model } from "mongoose";
import { CHAT_MODEL, USER_MODEL } from "./constent";
import {hash , compare} from "bcrypt";

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
      ref: CHAT_MODEL,
    },
  ],
  
},{
  timestamps: true,
  methods:{
     isPasswordMaching(Plainpassword: string){
    return compare(Plainpassword, this.password)
    
    }
  }
});

const SALT_ROUND = 10
userschema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password =  await hash(this.password, SALT_ROUND);
});

export default model(USER_MODEL, userschema);