import mongoose from "mongoose";


export const tinderCardSchema = new mongoose.Schema({
    id: Number,
    name: String,
    url: String,
});


