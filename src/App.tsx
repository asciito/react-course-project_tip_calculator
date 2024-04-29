import MenuItem from "./components/MenuItem"
import OrderContent from "./components/OrderContent";
import OrderTotal from "./components/OrderTotal";
import Tips from "./components/Tips";
import { menuItems } from "./data/db"
import useOrder from "./hooks/order"

function App() {
    const { order, tip, setTip, addOrderItem, removeOrderItem, placeOrder } = useOrder();

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
                                ? menuItems.map(item => <MenuItem key={item.id} data={item} addToOrder={addOrderItem} />)
                                : null
                        }
                    </div>
                </div>

                <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
                    <h2 className="text-4xl font-black text-center">Consumo</h2>

                    {
                        order.length
                            ? <>
                                <OrderContent order={order} removeFromOrder={removeOrderItem} />

                                <Tips setTip={setTip} />

                                <OrderTotal order={order} tip={tip} placeOrder={placeOrder} />
                            </>
                            : <p className="text-center">La orden esta vacia</p>
                    }
                </div>
            </main>
        </>
    )
}

export default App
