import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:String,
    mobile:Number,
    image:String,

})

const Category = mongoose.model('MERN_ECOMMERCE', categorySchema)

export default Category;