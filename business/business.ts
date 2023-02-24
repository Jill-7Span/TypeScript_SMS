import express from "express";
import { BusinessController } from "./businessController";
import { authOfBusiness } from "../middleware/authMiddleware";
import { signUpBusiness, loginBusiness, updateBusiness } from "../validation/indexOfRequest";

export class Business {

    public router = express.Router();
    public businessController: BusinessController;
  
  
    constructor() {
      this.businessController = new BusinessController();
    }
  businessRoute():void {
  
     this.router.get("/business", authOfBusiness, Business.businessDetails);

  }
    
  }
  
router.get("/business", authOfBusiness, Business.businessDetails);

router.get("/list", authOfBusiness, businessList);

router.post("/signUp", signUpBusiness, businessSignUp);

router.get("/logIn", loginBusiness, businessLogIn);

router.put("/update", [updateBusiness, authOfBusiness], businessUpdate);

router.put("/changePassword", authOfBusiness, businessPasswordChange);

router.delete("/deleteBusiness", authOfBusiness, businessDelete);

export default router;