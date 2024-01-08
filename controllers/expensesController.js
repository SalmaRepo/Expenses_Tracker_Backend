import Expenses from "../models/expenseSchema.js";
import User from "../models/userSchema.js";

export const createExpense = async (req, res, next) => {
  /*   console.log(req.body)
    console.log(req.files) */

  let sampleFile;
  let uploadPath;

  if (req.files) {
    sampleFile = req.files.file;
  } else {
    sampleFile = "";
  }

  uploadPath = "assets/" + Date.now() + "_" + sampleFile.name;

  /*  sampleFile.mv(uploadPath, async function(err) { */

  const createExpense = await Expenses.create({
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    userId: req.body.userId,
    reciept: uploadPath,
  });

  const updateUserExpenses = await User.findByIdAndUpdate(
    req.body.userId,
    /*  { $push: { expenses: { $each: [createExpense._id], $position: 0 } } } */
    { $push: { expenses: createExpense._id } },
    { new: true }
  ).populate({ path: "expenses" });
  console.log(updateUserExpenses);
  res.json({ success: true, data: updateUserExpenses });
  console.log("File uploaded!");
  /*    }); */

  /* const image={
        filename:Date.now() +"_" +req.files?.file.name , 
        data : req.files?.file.data
    } */
};

export const updateExpense = async (req, res, next) => {
  let sampleFile;
  let uploadPath;

  if (req.files) {
    sampleFile = req.files.file;
  } else {
    sampleFile = "";
  }

  uploadPath = "assets/" + Date.now() + "_" + sampleFile.name;
  try {
    const updateExpense = await Expenses.findByIdAndUpdate(
      req.params.id,{
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      userId: req.body.userId,
      reciept: uploadPath},
      { new: true }
    );
    res.send({ success: true, data: updateExpense });
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const deleteExpense = await Expenses.findByIdAndDelete(req.params.id, {
      new: true,
    });

    const getExpenses = await Expenses.find();

    /* console.log(getExpenses) */

    const getExpensesIds=getExpenses.map(exp=>exp._id)
   /*  console.log(getExpensesIds) */

    const updateUser = await User.findByIdAndUpdate(req.user.id,{$set:{expenses:getExpensesIds}});
   /*   console.log('updateuser',updateUser) */
    res.send({ success: true, msg: "expense deleted" });
  } catch (err) {
    next(err);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const getExpenseById = await Expenses.findById(req.params.id);
    res.send({ success: true, data: getExpenseById });
  } catch (err) {
    next(err);
  }
};

export const getAllExpenses = async (req, res, next) => {
  try {
    const getAll = await Expenses.find();
    res.send({ success: true, data: getAll });
  } catch (err) {
    next(err);
  }
};

// GET BY USER
export const getExpensesByUser = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const userId = req.user.id;
    const userExpenses = await Expenses.find({ userId });
    console.log(userExpenses)
    res.send({ success: true, data: userExpenses });
  } catch (err) {
    next(err);
  }
};
