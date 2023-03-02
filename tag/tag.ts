import express from 'express';
import { Auth } from '../middleware/authMiddleware';
import { TagController } from './tagController';

export class Tag {
  constructor(public router = express.Router(), public auth: Auth, public tagController: TagController) {}

  public inRoute() {
    this.router.get('/findTag', this.auth.authOfBusiness, this.tagController.findTags);

    this.router.get('/allTag', this.auth.authOfBusiness, this.tagController.allTags);

    this.router.post('/createTag', this.auth.authOfBusiness, this.tagController.createTag);

    this.router.delete('/deleteTag', this.auth.authOfBusiness, this.tagController.deleteTag);
  }
}
