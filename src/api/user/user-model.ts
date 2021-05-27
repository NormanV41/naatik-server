import { Schema, model, Document } from 'mongoose';
import { compareSync, genSalt, hashSync, genSaltSync } from 'bcrypt';
import { logger } from '../../util/logger';

export interface IUser extends Document {
  username: string;
  password?: string;
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  deletePassword(): { _id: string; username: string; __v: number };
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { collection: 'user' }
);

userSchema.methods.authenticate = function(plainTextPassword) {
  return compareSync(plainTextPassword, this.password || '');
};

userSchema.methods.encryptPassword = (plainTextPassword) => {
  if (!plainTextPassword) {
    return '';
  }
  return hashSync(plainTextPassword, genSaltSync(10));
};

userSchema.methods.deletePassword = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj as {
    _id: string;
    username: string;
    __v: number;
  };
};
userSchema.pre<IUser>('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  if (!this.password) {
    throw new Error('password should not be undefined');
  }
  this.password = this.encryptPassword(this.password);
  next();
});

export const userModel = model<IUser>('user', userSchema);
