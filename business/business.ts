import express from 'express';
import { BusinessController } from './businessController';
import { authOfBusiness } from '../middleware/authMiddleware';
import { signUpBusiness, loginBusiness, updateBusiness } from '../validation/indexOfRequest';
import { routes } from '../helper/routesInterface';

export class Business implements routes {
  public router = express.Router();
  public businessController: BusinessController;

  constructor() {
    this.businessController = new BusinessController();
  }

  public businessRoute(): void {
    this.router.get('/business', authOfBusiness, this.businessController.businessDetails);

    this.router.get('/list', authOfBusiness, this.businessController.businessList);

    this.router.post('/signUp', signUpBusiness, this.businessController.businessSignUp);

    this.router.get('/logIn', loginBusiness, this.businessController.businessLogIn);

    this.router.put('/update', [updateBusiness, authOfBusiness], this.businessController.businessUpdate);

    this.router.put('/changePassword', authOfBusiness, this.businessController.businessPasswordChange);

    this.router.delete('/deleteBusiness', authOfBusiness, this.businessController.businessDelete);
  }
}
