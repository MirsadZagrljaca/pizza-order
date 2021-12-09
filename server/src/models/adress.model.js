import mongoose from "mongoose";

const AdressSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  adress: {
    type: String,
  },
  floor: {
    type: Number,
  },
});

export default mongoose.model("Adress", AdressSchema);
