import { Request, Response } from 'express';
import { SmsService } from './smsService';
import { statusSuccess } from '../common/statusCodes';
import { listOfNumbers } from '../helper/listOfNumbers';
import { findTemplate } from '../helper/findTemplate';
import { ContactService } from '../contacts/contactsService';
import template from '../template/templateService';

const accountSid = 'AC8576eaa8f6f74b7251f8dfabb5d259d4';
const authToken = 'd55d0c4dd3d49ae4976ee1fbe98eb5bb';

const client = require('twilio')(accountSid, authToken);

export class SmsController {
  public contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  sendSms = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const { searchTags } = req.body;
      const contactCondition = await listOfNumbers(searchTags, businessId);
      const allContacts = await this.contactService.allContacts(contactCondition);
      const templateContact = await findTemplate(req);
      const smsTemplate = await template.readTemplate(templateContact);
      const numberList = allContacts.map(({ contactNumber }:any) => contactNumber);
      const smsDetails = {
        message: smsTemplate[0].template,
        number: numberList,
      };
      return statusSuccess(res, 200, smsDetails);
    } catch (error) {
      return error;
    }
  };

  test = async (req: Request, res: Response) => {
    try {
      const sms = await client.messages.create({
        to: ['+919722030839'],
        from: '+18127140430',
        body: 'This is your captain speaking we are ready to take off wear your seat belt we are good to go',
      });
      // .then((message)=>console.log(message.sid))
      return sms.sid;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  };
}

// exports.test = async (req:Request, res:Response) => {
//     try {

//         const  notification = {
//             toBinding:[
//                 JSON.stringify({binding_type: "sms", address:"+919722030839"})
//             ],
//             body:"This is your captain speaking we are ready to take off wear your seat belt we are good to go"
//         }

//         client.notify
//         .services(serviceId)
//         .notifications.create(notification)
//         .then(notification => console.log("SMS ID", notification.sid))
//         .catch(error => console.log(error))

//     } catch (error) {

//         console.log('error: ', error);
//         return error
//     }
// }
// g5y6svaayjujiuzhhpk5bjt5ahx9gcdc