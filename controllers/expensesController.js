import Expenses from "../models/expenseSchema.js";

export const createExpense=async (req,res,next)=>{
    try{
    const createExpense=await Expenses.create(req.body);
    res.send({success:true,data:createExpense})
    }catch(err){
       next(err)
    }
}

export const updateExpense=async (req,res,next)=>{
    try{
    const updateExpense=await Expenses.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send({success:true,data:updateExpense})
    }catch(err){
        next(err)
    }
}

export const deleteExpense=async (req,res,next)=>{
    try{
   const deleteExpense=await Expenses.findByIdAndDelete(req.params.id)
   res.send({success:true,msg:"expense deleted"})
    }catch(err){
        next(err)
    }
}

export const getExpenseById=async (req,res,next)=>{
    try{
        const getExpenseById=await Expenses.findById(req.params.id)
        res.send({success:true,data:getExpenseById})

    }catch(err){
        next(err)
    }
}


export const getAllExpenses=async (req,res,next)=>{
    try{
   const getAll=await Expenses.find()
   res.send({success:true,data:getAll})
    }catch(err){
        next(err)
    }
   
}
