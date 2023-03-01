import express from 'express';
import { Auth } from '../middleware/authMiddleware';
import { TagController } from './tagController';

export class Tag {
  public router = express.Router();
  public auth: Auth;
  public tagController: TagController;

  constructor() {
    this.auth = new Auth();
    this.tagController = new TagController();
  }

  public inRoute() {
    this.router.get('/findTag', this.auth.authOfBusiness, this.tagController.findTags);

    this.router.get('/allTag', this.auth.authOfBusiness, this.tagController.allTags);

    this.router.post('/createTag', this.auth.authOfBusiness, this.tagController.createTag);

    this.router.delete('/deleteTag', this.auth.authOfBusiness, this.tagController.deleteTag);
  }
}

