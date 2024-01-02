import { Router } from "express";

import { auth } from "../middlewares/authorization.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

import {
  createIncome,
  updateIncome,
  deleteIncome,
  getAllIncomes,
  getIncomeById,
} from "../controllers/incomeController.js";

router.post("/createIncome",auth,isAdmin, createIncome);
router.patch("/updateIncome/:id",auth,isAdmin, updateIncome);
router.delete("/delteIncome/:id",auth,isAdmin, deleteIncome);
router.get("/getIncomeById/:id", getIncomeById);
router.get("/getAllIncomes", getAllIncomes);

export default router;
