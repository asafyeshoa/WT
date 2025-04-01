import { Schema } from 'mongoose';

export const MemeSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  url: String,
});
