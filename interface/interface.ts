export interface searchQuery {
  emailSearch?: string;
  numberSearch?: string;
  size?: string;
  page?: string;
}
export interface BodyData {
  email?: String;
  contactNumber?: String;
}


export interface changePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
