import React from "react";
import UserTable from "./UserTable";
interface Props {
    searchParams: { sortOrder: string, sortDirection: string };
}

const UsersPage = ({ searchParams: { sortOrder, sortDirection } }: Props) => (
    <>
        <h1>Users</h1>
        <UserTable sortOrder={sortOrder} sortDirection={sortDirection}/>
    </>
);

export default UsersPage;
