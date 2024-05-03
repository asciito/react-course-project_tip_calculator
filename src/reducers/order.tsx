import { MenuItem, OrderItem } from "../types";

export type OrderState = {
    tip: number
    order: OrderItem[]
}

export type OrderAction =
    { type: 'add-item-to-order', payload: { menuItem: MenuItem } } |
    { type: 'remove-item-from-order', payload: { orderItemID: OrderItem['id'] } } |
    { type: 'set-tip', payload: { tip: number } } |
    { type: 'place-order' }


export const initialState = (): OrderState => ({
    tip: 0,
    order: []
});

export function reducer(state: OrderState, action: OrderAction): OrderState {
    const { type } = action;
    const { tip, order } = state;

    if (type === 'add-item-to-order') {
        const { menuItem } = action.payload;
        const orderIndex = order.findIndex(orderItem => orderItem.id === menuItem.id);

        if (orderIndex === -1) {
            return {
                ...state,
                order: [...order, { ...menuItem, qty: 1 }]
            }
        }

        return {
            tip,
            order: order.map((orderItem, index) => orderIndex === index ? {...orderItem, qty: orderItem.qty + 1} : orderItem)
        }
    }

    if (type === 'remove-item-from-order') {
        const { orderItemID } = action.payload;

        return {
            tip,
            order: order.reduce<OrderItem[]>((prevOrder, orderItem) => {
                if (orderItem.id === orderItemID) {
                    if (orderItem.qty - 1 === 0) {
                        return prevOrder;
                    }

                    return [...prevOrder, { ...orderItem, qty: orderItem.qty - 1 }];
                }

                return [...prevOrder, orderItem];
            }, [])
        }
    }

    if (type === 'set-tip') {
        const { tip } = action.payload;

        return { tip, order }
    }

    if (type === 'place-order') {
        return initialState();
    }

    return state;
}