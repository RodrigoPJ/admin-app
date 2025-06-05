import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  components:string[]
}

export const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, trim: true },
    components:     { type: [String], required: true },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default model<IRole>("Role", roleSchema);