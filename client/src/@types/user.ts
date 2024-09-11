import { UserAvatar } from './userAvatar';

export interface User {
  _id: string;
  username: string;
  avatar: UserAvatar;
}