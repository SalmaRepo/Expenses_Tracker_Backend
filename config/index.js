import mongoose from "mongoose"

function DBConnection(){
    mongoose.connect(
        'mongodb+srv://salmashaikh751:X1IBMWQwiQXjKARE@cluster0.n0zgkci.mongodb.net/expensesTracker'
    ).then(() => console.log("We connected to DB 😉"))
    .catch((err) => console.log(err));
}

export default DBConnection