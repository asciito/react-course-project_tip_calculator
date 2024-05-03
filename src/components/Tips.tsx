const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type TipProps = {
    setTip: (tip: number) => void
}

export default function Tips({ setTip }: TipProps) {
    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>

            <form action="">
                <div>
                    {
                        tipOptions.map(({ id, label, value }) => (
                            <div key={id} className="flex gap-2 ">
                                <label htmlFor={id}>{label}</label>
                                <input
                                    id={id}
                                    type="radio"
                                    value={value}
                                    name="tip"
                                    onChange={({ target: { value } }) => setTip(parseFloat(value))}
                                />
                            </div>
                        ))
                    }
                </div>
            </form>
        </div>
    )
}