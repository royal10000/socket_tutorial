import { Schema, model } from "mongoose";
const bookSchmea = new Schema({
    bookName: {
        type: String
    },
    bookPrice: {
        type: String
    }
})

const Book = model('book', bookSchmea)

export default Book