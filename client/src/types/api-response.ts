import type { IUser } from "../schema/user-grouped-schema-types";
import type { SignedUser } from "./auth-types";
import type { Status, Level } from "../schema/task-grouped-schema-types";

export interface LoginResponse {
    user: SignedUser;
    accessToken: string;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}


export interface CreateUserResponse {
    user: IUser;
    success: boolean;
    message: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: Status;
  level: Level;
  isActive: boolean;
  deadline: Date;
  assigneeId: string;
  createdAt: Date;
  updatedAt: Date;

}


export interface TaskedUser {
  id: string;
  email: string;
}



export interface TaskWithAssignee {
  tasks: ITask[]
  assignee: TaskedUser;
}


export interface GetAllUsersResponse {
  totalCount: number;
  users: IUser[];
}