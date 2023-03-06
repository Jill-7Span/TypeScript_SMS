export class CheckData {
  // null check function
  public static nullCheck = <T>(data: any): null | T => {
    if (data == (null || undefined)) {
      return null;
    } else if (data._doc) {
      return data._doc;
    } else {
      return data;
    }
  };
}
