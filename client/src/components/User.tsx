import { useQuery } from "@tanstack/react-query";
import { type GetAllUsersResponse } from "../types/api-response";
import { useState } from "react";
import { getAllUsersApi } from "../api/user";
import type { IUser } from "../schema/user-grouped-schema-types";

const User = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    
    const {data, isLoading, isError} = useQuery<GetAllUsersResponse>({
        queryKey: ["users", pageNumber, pageSize],
        queryFn: () => getAllUsersApi(pageNumber, pageSize)
    });

    const users = data?.users || [];

    const getUserBadgeClass = (user: IUser) => {
  if (user.role === "ADMIN") {
    return "bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-md border border-blue-100";
  }

  return "bg-gray-50 text-gray-600 px-2 py-1 text-xs rounded-md border border-gray-200";
};
 
    return (
     <div className=" border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex-1 bg-white m-3">
    <table className="w-full table-fixed text-sm">
   <thead className="bg-blue-600 text-white">
  <tr>
    <th className="p-3  w-1/4 text-center">Id</th>
    <th className="p-3 text-center w-1/4">Email</th>
    <th className="p-3 text-center w-1/4" >Role</th>
    <th className="p-3 text-center w-1/4">Created</th>
    <th className="p-3 text-center w-1/4">Updated</th>
    <th className="p-3 text-center w-1/4">Actions</th>
  </tr>
</thead>

   <tbody className="divide-y divide-gray-100 bg-white">
  {users.map((user) => (
    <tr key={user.id}>
      <td className="p-3 text-gray-800 text-center">{user.id}</td>
    
      <td className="p-3 text-gray-800 text-center">{user.email}</td>

      <td className="p-3 text-center">
        <span className={getUserBadgeClass(user)}>
          {user.role}
        </span>
      </td>

      <td className="p-3 text-gray-600 text-center">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="p-3 text-gray-600 text-center">
        {new Date(user.updatedAt).toLocaleDateString()}
      </td>

      <td className="text-center text-white">
        <button className="mr-2 px-3 bg-red-600 rounded-md py-1.5 cursor-pointer">Delete</button>
        <button className=" px-4.5 bg-blue-600 rounded-md py-1.5 cursor-pointer">View</button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
   
  </div>

    )
}

export default User;