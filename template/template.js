const express = require('express');
const router = express.Router();
const templateController = require("./templateController");
const middleware = require("../middleware/authMiddleware");

export class Template {
    
}


router.get("/readTemplate", middleware.authOfBusiness, templateController.readTemplate);

router.post("/addTemplate", middleware.authOfBusiness, templateController.addTemplate);

router.put("/updateTemplate", middleware.authOfBusiness, templateController.updateTemplate);

router.delete("/deleteTemplate", middleware.authOfBusiness, templateController.deleteTemplate);


module.exports = router;