import mongoose, { Model, Schema } from "mongoose";

export interface ITag extends Document {
  name: string;
  clerkUserId: string;
}

const SingleTagSchema: Schema<ITag> = new Schema({
    name: {
        type: String,
        required: true,
    },
    clerkUserId: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Tag: Model<ITag> = mongoose.models.Tag || mongoose.model<ITag>("Tag", SingleTagSchema);

export default Tag;