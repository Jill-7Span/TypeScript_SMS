// null check function
export const checkData = (data:any) => {
    if (data == null) {
        return null;
    } else if (data._doc) {
        return data._doc;
    } else {
        return data;
    }
};




