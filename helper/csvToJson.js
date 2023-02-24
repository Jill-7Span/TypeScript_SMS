const status = require("../common/statusCodes");
const tag = require("../tag/tagService");
const csvtojson = require("csvtojson");
const path = require("path");
const fs = require("fs");

exports.csvToJson = async (req, res) => {

    const businessId = req.business._id;
    const tagName = req.query.tags;
    const tagId = await tag.findTags(tagName, businessId);
    const document = path.join(__dirname, `../temp/${req.file.originalname}`);
    const csvData = await csvtojson().fromFile(document);
    csvData.forEach((obj) => {
        obj['businessId'] = businessId;
        obj['tagId'] = tagId._id;
    });
    fs.unlink(document, (error) => {
        if (error) {
            return status.error(res, "400", error);
        };
    });
    console.log(`Temp File ${document} is deleted`);
    return csvData;
};