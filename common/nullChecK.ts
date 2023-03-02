export class CheckData {
  // null check function
  public static nullCheck = (data:any): null|Object => {
    if (data == null) {
      return null;
    } else if (data._doc) {
      return data._doc;
    } else {
      return data;
    }
  };
}
