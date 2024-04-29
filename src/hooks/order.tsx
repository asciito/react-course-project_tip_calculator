import { useState } from "react"
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip, setTip] = useState(0);

    const addOrderItem = (menuItem: MenuItem): void => {
        setOrder((order: OrderItem[]): OrderItem[] => {
            const orderItemExistsIndex = order.findIndex(orderItem => orderItem.id === menuItem.id);

            if (orderItemExistsIndex === -1) {
                return [...order, { ...menuItem, qty: 1 }]
            }

            return order.map(orderItem => {
                if (orderItem.id === menuItem.id) {
                    return { ...orderItem, qty: orderItem.qty + 1 };
                }

                return orderItem;
            });
        });
    }

    const removeOrderItem = (menuItem: MenuItem): void => {
        setOrder(order =>
            order.reduce<OrderItem[]>((prevOrder, item) => {
                if (item.id === menuItem.id) {
                    if (item.qty - 1 === 0) {
                        return prevOrder;
                    }

                    return [...prevOrder, { ...item, qty: item.qty - 1 }];
                }

                return [...prevOrder, item];
            }, [])
        )
    }

    const placeOrder = () => setOrder([]);

    return {
        order,
        tip,
        setTip,
        addOrderItem,
        removeOrderItem,
        placeOrder
    }
}