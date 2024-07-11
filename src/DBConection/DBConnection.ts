import mongoose from "mongoose";
export async function DBConnect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB Connected Successfully !!")
        })
    } catch (error) {
        console.log("MongoDB Connection Error !! \n Please try again !!");
        process.exit();
    }
}