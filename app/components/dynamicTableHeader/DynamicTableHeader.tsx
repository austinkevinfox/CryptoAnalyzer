// Custom table header component supporting sortOrder and sortDirection
import React from "react";
import HeaderLink from "./HeaderLink";
interface Props {
    path: string;
    sortOrder: string;
    sortDirection: string;
    links: { label: string; type: string }[];
}

const DynamicTableHeader = ({
    path,
    sortOrder,
    sortDirection,
    links,
}: Props) => {
    return (
        <thead>
            <tr>
                {links.map((link) => (
                    <th key={link.type}>
                        <HeaderLink
                            type={link.type}
                            label={link.label}
                            sortOrder={sortOrder}
                            sortDirection={sortDirection}
                            path={path}
                        />
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default DynamicTableHeader;
