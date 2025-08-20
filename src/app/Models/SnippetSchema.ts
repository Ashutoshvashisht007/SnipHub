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
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [SingleTagSchema],
        default: ["All"],
    },
    description: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        default: ""
    },
    language: {
        type: String,
        default: ""
    },
    creationDate: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const SingleSnippet = mongoose.models.SingleSnippet || mongoose.model("SingleSnippet", SingleSnippetSchema);

export default SingleSnippet;