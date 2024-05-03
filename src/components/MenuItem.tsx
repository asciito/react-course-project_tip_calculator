import { ReactElement } from "react";
import type { MenuItem } from "../types";

type MenuItemProps = {
    data: MenuItem
    addToOrder: (menuItem: MenuItem) => void
}

export default function MenuItem({ data, addToOrder }: MenuItemProps): ReactElement<MenuItemProps> {
    return (
        <button
            className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
            onClick={() => addToOrder(data)}
        >
            <p>{data.name}</p>
            <p className="font-black">{data.price}</p>
        </button>
    );
}
