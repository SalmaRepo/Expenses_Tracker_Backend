import {Schema,model} from  "mongoose"

const incomeSchema=new Schema({
    amount:{type:Number},
    category: {type: String, enum: ["Salary", "Shares", "Mini-Job", "Gifts","Properties","others"]},
    date:{type:Date,default:new Date()},

})

const Incomes=model("incomes",incomeSchema)

export default Incomes