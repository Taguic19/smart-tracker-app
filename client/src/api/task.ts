import { api } from "../configs/axios";
import type { TaskWithAssignee } from "../types/api-response";

export const getTasksApi = async (pageNumber: number, pageSize: number) => {
    try {
     
    const {data} = await api.get<TaskWithAssignee>(`http://localhost:3000/api/v1/task?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return data;

    } catch (err) {
        throw err;
    }
}