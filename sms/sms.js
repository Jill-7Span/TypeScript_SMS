const express = require('express');
const router = express.Router();
const smsController = require("./smsController");
const middleware = require("../middleware/authMiddleware");

export class Sms {
    
}

router.get("/testSms", smsController.test)

router.post("/sendSms", middleware.authOfBusiness, smsController.sendSms);


module.exports = router;