import { Schema, model, Document } from "mongoose";
import { Roles } from "../../utils/types";


interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  roles: Roles[];
  managedUsers?: string[];
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  {type: String, required: true,},
    roles: { type: [String], required: true},
    managedUsers: {type: [String], required: false}
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default model<IUser>("User", userSchema);
