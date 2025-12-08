import express from "express";
import shipperAuthRoute from "./shipper/shipper-auth.route.js";

const routerShipper = express.Router();

routerShipper.use("/", shipperAuthRoute);

export default routerShipper;
