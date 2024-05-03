import { useMemo, useCallback } from "react";
import { formatToPrice } from "../helpers";
import { OrderItem } from "../types";

type OrdersTotalProps = {
    order: OrderItem[],
    tip: number
    placeOrder: () => void
}

export default function OrderTotal({ order, tip, placeOrder }: OrdersTotalProps) {
    const subTotal = useCallback(() => order.reduce((total, item) => total + (item.qty * item.price), 0), [order])
    const tipTotal = useCallback(() => tip * subTotal(), [tip, subTotal]);
    const total = useMemo(() => subTotal() + tipTotal(), [subTotal, tipTotal]);

    return (
        <>
            <div className="space-y-4">
                <h1 className="font-black text-2xl">Total y propina:</h1>
                <p>
                    Subtotal a pagar: {' '}
                    <span className="font-bold">{formatToPrice(subTotal())}</span>
                </p>

                <p>
                    Propina: {' '}
                    <span className="font-bold">{formatToPrice(tipTotal())}</span>
                </p>

                <p>
                    Total a pagar: {' '}
                    <span className="font-bold">{formatToPrice(subTotal() + tipTotal())}</span>
                </p>
            </div>

            <button
                className="w-full disabled:opacity-60 disabled:cursor-not-allowed transition-all bg-black p-3 uppercase text-white font-bold mt-10"
                disabled={total === 0}
                onClick={() => placeOrder()}
            >Guardar orden</button>
        </>
    )
}