import mongoose, { model, Schema } from "mongoose";

const Scheme = mongoose.Schema;

const kanjiSchema = new Schema({

    symbol: {
        type: String,
        required: true
    },

    pronunciation: {
        type :String,
        required: true
    },

    english : {
        type: String,
        required: true
    }
});

const Kanji = mongoose.model("Kanji", kanjiSchema);
model.exports = Kanji;