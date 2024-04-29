import { ReactElement } from "react";
import type { OrderItem, MenuItem } from "../types";
import { formatToPrice } from "../helpers";

type OrderContentProps = {
    order: OrderItem[],
    removeFromOrder: (OrderItem: MenuItem) => void
}

export default function OrderContent({ order, removeFromOrder }: OrderContentProps): ReactElement<OrderContentProps> {
    return (
        <div className="space-y-3 mt-10">
            {
                order.map(item => {
                    return (
                        <div key={item.id} className=" flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b">
                            <div>
                                <p>{item.name} - <span className="font-black">{formatToPrice(item.price)}</span></p>

                                <p className="text-sm">Quantity: {item.qty} - <span className="font-black">{formatToPrice(item.qty * item.price)}</span></p>
                            </div>

                            <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black" onClick={() => removeFromOrder(item)}>X</button>
                        </div>
                    );
                })
            }
        </div>
    );
}