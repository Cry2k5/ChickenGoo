import express from "express";
import { branchController } from "../../controllers/branch.controller.js";

const routerBranch = express.Router();

routerBranch.get("/", branchController.getAll);
routerBranch.post("/", branchController.create);
routerBranch.put("/:id", branchController.update);
routerBranch.delete("/:id", branchController.delete);

export default routerBranch;
