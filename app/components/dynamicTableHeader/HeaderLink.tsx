// Custom header link component supporting sortOrder and sortDirection
import Link from "next/link";
import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
interface Props {
    type: string;
    sortOrder: string;
    sortDirection: string;
    label: string;
    path: string;
}

const HeaderLink = ({ type, sortOrder, sortDirection, label, path }: Props) => {
    const isTypeSortOrderMatch = sortOrder === type;
    const newSortDirection =
        isTypeSortOrderMatch && sortDirection === "asc" ? "desc" : "asc";
    const iconDirection = newSortDirection === "asc" ? "rotate-180" : "";
    const iconInvisibility = isTypeSortOrderMatch ? "" : "invisible";
    return (
        <Link
            href={`${path}?sortOrder=${type}&sortDirection=${newSortDirection}`}
            className="flex"
        >
            <ChevronUpIcon
                className={`size-3 mr-1 ${iconInvisibility} ${iconDirection}`}
            />
            <span className={`${isTypeSortOrderMatch ? "text-sky-400" : ""}`}>
                {label}
            </span>
        </Link>
    );
};

export default HeaderLink;
