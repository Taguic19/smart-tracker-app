import { useQuery } from "@tanstack/react-query";
import { getTasksApi } from "../api/task";
import type { TaskWithAssignee } from "../types/api-response";
import { useState } from "react";


export const Task = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {data: taskData, isLoading, isError} = useQuery<TaskWithAssignee>({
        queryKey: ["tasks", pageSize, pageNumber],
        queryFn: () => getTasksApi(pageNumber, pageSize)
    });

    

   
    return (
        <div className=" bg-white flex-1 overflow-auto mx-3 my-3 pl-6">
        {isLoading && <div className="text-center">Loading Task.. Please wait</div>}
        {isError && <div>Error Fetching tasks</div>}
        {taskData?.tasks.length === 0 && <div className="text-center mt-6 text-lg">
            <p>Currently, You haven't delegated any tasks.</p>
            <button className="rounded-md bg-blue-600 cursor-pointer mt-2 text-white px-10 py-1.5">Delegate Task</button>
            </div>}
        </div>
    )
}

export default Task;