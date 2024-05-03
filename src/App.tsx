import { useEffect, useReducer } from "react";
import MenuItem from "./components/MenuItem"
import OrderContent from "./components/OrderContent";
import OrderTotal from "./components/OrderTotal";
import Tips from "./components/Tips";
import { menuItems } from "./data/db"
import { reducer, initialState as orderInitialState, OrderState } from "./reducers/order";

const initialState = (): OrderState => {
    const order = localStorage.getItem('order');

    if (!order) {
        return orderInitialState();
    }

    return JSON.parse(order);
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState());

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(state));
    }, [state]);

    return (
        <>
            <header className="bg-teal-400 py-5">
                <h1 className="text-center text-4xl font-black">Calculadora de Propinas y consumo</h1>
            </header>

            <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
                <div className="p-5">
                    <h2 className="text-4xl font-black">Menú</h2>

                    <div className="space-y-3 mt-10">
                        {
                            menuItems
                                ? menuItems.map(item => (
                                    <MenuItem
                                        key={item.id}
                                        data={item}
                                        addToOrder={(menuItem) => dispatch({ type: 'add-item-to-order', payload: { menuItem } })} />
                                ))
                                : null
                        }
                    </div>
                </div>

                <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
                    <h2 className="text-4xl font-black text-center">Consumo</h2>

                    {
                        state.order.length
                            ? <>
                                <OrderContent
                                    order={state.order}
                                    removeFromOrder={(orderItemID) => dispatch({ type: 'remove-item-from-order', payload: { orderItemID } })}
                                />

                                <Tips setTip={(tip) => dispatch({ type: 'set-tip', payload: { tip } })} />

                                <OrderTotal order={state.order} tip={state.tip} placeOrder={() => dispatch({ type: 'place-order' })} />
                            </>
                            : <p className="text-center">La orden esta vacia</p>
                    }
                </div>
            </main>
        </>
    )
}

export default App
