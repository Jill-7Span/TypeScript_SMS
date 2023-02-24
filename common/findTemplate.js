exports.findTemplate = async (req) => {
    const businessId = req.business._id;
    const { templateId, search } = req.query;
    let condition = {};
    if (search) {
        condition = {
            $and: [
                {
                    $or: [
                        { template: { $regex: search } },
                        { category: { $regex: search } },
                    ]
                },
                { businessId },
            ]
        }
    } else if (templateId) {
        condition = {
            $and: [
                { _id:templateId },
                { businessId },
            ]
        }
    }
    return condition;
};