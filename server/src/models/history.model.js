import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  total: {
    type: Number,
  },
  date: {
    type: String,
  },
  dough: {
    type: String,
  },
  ingredients: {
    type: Array,
  },
  times: { type: String },
});

export default mongoose.model("History", HistorySchema);
