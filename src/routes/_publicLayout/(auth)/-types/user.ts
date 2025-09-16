
export interface UserDataType {
  id: number | string;  // Allow both string and number for flexibility
  userName: string;
  email?: string;
  createdAt: string;
  authToken: string;
  isLoggedIn: boolean;
}
