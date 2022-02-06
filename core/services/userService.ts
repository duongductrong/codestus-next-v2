export interface UserI {
  avatar?: string;
  created_at?: string;
  email?: string;
  email_verified_at?: string;
  name?: string;
  updated_at?: string;
  userId?: number;
}

class UserService {}

const userService = new UserService();

export default userService;
