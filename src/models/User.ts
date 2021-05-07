export default interface User {
  username: string;
  fullName: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  role: string[];
}
