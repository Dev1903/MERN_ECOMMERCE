import mongoose from "mongoose";

const Connection = async () =>{
    const URL = `mongodb+srv://bristidev2004:bNBP8xUJVdhsRBDn@database.0gqkb.mongodb.net/?retryWrites=true&w=majority&appName=DataBase`;
    try {
        await mongoose.connect(URL)
        console.log('DB Connected')
    } catch (error) {
        console.log('Error While Connecting Database', error)
    }
}

export default Connection