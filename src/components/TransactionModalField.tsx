import TextUppercase from "./TextUppercase";

export default function TransactionModalField({ label, value }: { label?: string, value: any }) {
    return (
        <div className="space-y-2">
            <TextUppercase>
                {label}
            </TextUppercase>
            <p className="text-md text-wrap">{value}</p>
        </div>
    )
}