import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
    tags: {
        type: Array,
        default: [],
    },
    text: String,
    isDone: {
        type: Boolean,
        default: false,
    },
    effStaDt: {
        type: Date,
        default: Date.now,
    },
    effEndDt: {
        type: Date,
        default: Date.now,
    },
});

export default model('Todo', TodoSchema);
