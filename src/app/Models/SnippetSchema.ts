import mongoose, { Schema } from 'mongoose';

const SingleTagSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { _id: false }
);


const SingleSnippetSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        required: true,
        default: false
    },
    isTrash: {
        type: Boolean,
        required: true,
        default: false
    },
    tags: {
        type: [SingleTagSchema],
        required: true,
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        default: ""
    },
    language: {
        type: String,
        required: true,
        default: ""
    },
    creationDate: {
        type: String,
        required: true,
        default: "",
    }
}, { timestamps: true });

const SingleSnippet = mongoose.models.SingleSnippet || mongoose.model("SingleSnippet", SingleSnippetSchema);

export default SingleSnippet;