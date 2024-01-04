import {Schema,model} from  "mongoose"

const expenseSchema=new Schema({
    amount:{type:Number},
    category: {type: String, enum: ["Food", "Shopping", "Fuel", "Telephone","Pets","Holidays","Kids","Insurance","Energy","Rent","others"]},
    date:{type:Date,default:new Date()},
    reciept:{type:String}

})

const Expenses=model("expenses",expenseSchema)

export default Expenses