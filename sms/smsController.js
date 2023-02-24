const smsService = require("./smsService");
const status = require("../common/indexOfCommon");
const condition = require("../common/indexOfCommon");
const contacts = require("../contacts/contactsService");
const template = require("../template/templateService");

const accountSid = "AC8576eaa8f6f74b7251f8dfabb5d259d4"
const authToken = "d55d0c4dd3d49ae4976ee1fbe98eb5bb"

const client = require('twilio')(accountSid, authToken);

exports.sendSms = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { searchTags } = req.body;
        const contactCondition = await condition.listOfNumber(searchTags, businessId);
        const allContacts = await contacts.allContacts(contactCondition);
        const templateContact = await condition.findTemplate(req);
        const smsTemplate = await template.readTemplate(templateContact);
        const numberList = allContacts.map(({ contactNumber }) => contactNumber);
        const smsDetails = {
            message: smsTemplate[0].template,
            number: numberList
        };
        return status.success(res, "200", smsDetails)
    } catch (error) {
        return error;
    }
};


exports.test = async (req, res) => {
    try {
        const sms = await client.messages.create({
            to:["+919722030839"],
            from:"+18127140430",
            body:"This is your captain speaking we are ready to take off wear your seat belt we are good to go"
        })
        // .then((message)=>console.log(message.sid))
        return (sms.sid)
    } catch (error) {
        console.log('error: ', error);
        return error
    }
}


// exports.test = async (req, res) => {
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