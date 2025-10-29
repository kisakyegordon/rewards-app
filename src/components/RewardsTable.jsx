import { monthLabel } from "../utils/rewardsUtils";

const RewardsTable = ({ months, rows }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-sm">
            <thead>
                <tr>
                    <th className="text-left px-3 py-2 bg-gray-100 border-b font-semibold w-2/5">Customer</th>
                    {months.map((m) => (
                        <th key={m} className="text-right px-3 py-2 bg-gray-100 border-b font-semibold">{monthLabel(m)}</th>
                    ))}
                    <th className="text-right px-3 py-2 bg-gray-100 border-b font-semibold">Total</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.customerId} className="border-b last:border-b-0">
                        <td className="px-3 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                            {row.customer} <span className="text-gray-500 text-xs">({row.customerId})</span>
                        </td>
                        {months.map((m) => (
                            <td key={m} className="px-3 py-2 text-right">{row.perMonth.get(m) || 0}</td>
                        ))}
                        <td className="px-3 py-2 text-right font-semibold">{row.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default RewardsTable;