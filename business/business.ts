import express from 'express';
import { BusinessController } from './businessController';
import { Auth, loginBusiness, signUpBusiness, updateBusiness } from '../middleware/indexOfMiddleware';
import { routes } from '../interface/routesInterface';

export class Business implements routes {
  public router = express.Router();
  public auth: Auth;
  public businessController: BusinessController;
  constructor() {
    this.auth = new Auth();
    this.businessController = new BusinessController();
  }

  public inRoute(): void {
    this.router.get('/business', this.auth.authOfBusiness, this.businessController.businessDetails);

    this.router.get('/list', this.auth.authOfBusiness, this.businessController.businessList);

    this.router.post('/signUp', signUpBusiness, this.businessController.businessSignUp);

    this.router.get('/logIn', loginBusiness, this.businessController.businessLogIn);

    this.router.put('/update', [updateBusiness, this.auth.authOfBusiness], this.businessController.businessUpdate);

    this.router.put('/changePassword', this.auth.authOfBusiness, this.businessController.businessPasswordChange);

    this.router.delete('/deleteBusiness', this.auth.authOfBusiness, this.businessController.businessDelete);
  }
}
