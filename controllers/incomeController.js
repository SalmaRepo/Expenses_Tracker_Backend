import Incomes from "../models/incomeSchema.js";

export const createIncome=async (req,res,next)=>{
    try{
    const createIncome=await Incomes.create(req.body);
    res.send({success:true,data:createIncome})
    }catch(err){
       next(err)
    }
}

export const updateIncome=async (req,res,next)=>{
    try{
    const updateIncome=await Incomes.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send({success:true,data:updateIncome})
    }catch(err){
        next(err)
    }
}

export const deleteIncome=async (req,res,next)=>{
    try{
   const deleteIncome=await Incomes.findByIdAndDelete(req.params.id)
   res.send({success:true,msg:"income deleted"})
    }catch(err){
        next(err)
    }
}

export const getIncomeById=async (req,res,next)=>{
    try{
        const geIncomeById=await Incomes.findById(req.params.id)
        res.send({success:true,data:getIncomeById})

    }catch(err){
        next(err)
    }
}


export const getAllIncomes=async (req,res,next)=>{
    try{
   const getAll=await Incomes.find()
   res.send({success:true,data:getAll})
    }catch(err){
        next(err)
    }
   
}
