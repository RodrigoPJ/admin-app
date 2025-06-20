import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
  app: string;
  role: string;
  label: string;
  description: string;
  permissions: string[];
}

export const roleSchema = new Schema<IRole>(
  {
    app: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    permissions: { type: [String], required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export default model<IRole>('Role', roleSchema);
