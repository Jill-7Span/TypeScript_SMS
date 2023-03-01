import express from 'express';
import { Auth } from '../middleware/authMiddleware';
import tagController from './tagController';

export class Tag {
  public router = express.Router();
  public auth : Auth;

  constructor () {
    this.auth = new Auth();
  }

  public inRoute() {
    this.router.get('/findTag', this.auth.authOfBusiness, tagController.findTags);

    this.router.get('/allTag', this.auth.authOfBusiness, tagController.allTags);

    this.router.post('/createTag', this.auth.authOfBusiness, tagController.createTag);

    this.router.delete('/deleteTag', this.auth.authOfBusiness, tagController.deleteTag);
  }
}

module.exports = router;
