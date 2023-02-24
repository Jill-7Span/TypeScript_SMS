// null check function

exports.data = (data) => {
    if (data == null) {
        return null;
    } else if (data._doc) {
        return data._doc;
    } else {
        return data;
    }
};




