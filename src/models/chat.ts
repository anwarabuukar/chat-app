import { Schema, model, Types } from 'mongoose';
import { CHAT_MODEL, USER_MODEL } from './constent';
export const CHAT_STATUS = {
    ACTIVE: 'active',
    ARCHIVED: 'archived'
}as const;

 export type CHAT_STATUS = typeof CHAT_STATUS[keyof typeof CHAT_STATUS];

const chatshema = new Schema({
    title:{
        type: String,
    },
    status:{
        type: String,
        enum: Object.values(CHAT_STATUS),
        default: CHAT_STATUS.ACTIVE
    },
    members:[{
        type: Types.ObjectId,
        ref: CHAT_MODEL,
    }],
    admin:{
        type: Types.ObjectId,
        ref: USER_MODEL,
    }
})
export default model(CHAT_MODEL, chatshema);