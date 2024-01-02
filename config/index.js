import mongoose from "mongoose"

function DBConnection(){
    mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING
    ).then(() => console.log("We connected to DB 😉"))
    .catch((err) => console.log(err));
}

export default DBConnection