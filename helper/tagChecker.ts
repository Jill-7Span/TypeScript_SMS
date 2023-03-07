export class TagChecker {

  public static alreadyExistedTag = async (tagName: string, businessId: string) => {
    try {
      const existedTag = await TagChecker.findTag (tagName, businessId);
      if (!existedTag) {
        const tag = {
          tag: tagName,
          businessId: businessId,
        };
        return tag;
      } else {
        return 'Already Existed Tag';
      }
    } catch (error) {
      throw error as Error;
    }
  };

  public static findTag = async (tagName: string, businessId: string):Promise<any> => {
    try {
      const existedTag = await TagChecker.findTag(tagName, businessId);
      if (existedTag) {
        return existedTag;
      } else {
        return 'Not Found Tag';
      }
    } catch (error) {
      throw error as Error;
    }
  };
}
