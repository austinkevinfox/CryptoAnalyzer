import React from "react";
import Link from "next/link";
import { sort } from "fast-sort";
import DynamicTableHeader from "../components/dynamicTableHeader/DynamicTableHeader";

interface User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}
interface Props {
    sortOrder: string;
    sortDirection: string;
}

const UserTable = async ({ sortOrder='name', sortDirection='asc' }: Props) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    let users: User[] = await res.json();
    users
        .filter((u) => u.name.split(" ").length === 2)
        .forEach((u) => {
            let tmpNames = u.name.split(" ", 2);
            u.firstName = tmpNames[0];
            u.lastName = tmpNames[1];
        });
    const sortedUsers =
        sortDirection === "desc"
            ? sort(users).desc((u) => u[sortOrder as keyof User])
            : sort(users).asc((u) => u[sortOrder as keyof User]);

    return (
        <table className="table table-bordered">
            <DynamicTableHeader
                path="/users"
                sortOrder={sortOrder}
                sortDirection={sortDirection}
                links={[
                    { type: "name", label: "Name" },
                    { type: "firstName", label: "First name" },
                    { type: "lastName", label: "Last name" },
                    { type: "username", label: "Username" },
                    { type: "email", label: "Email" },
                ]}
            />

            <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
