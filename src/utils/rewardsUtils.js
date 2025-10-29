import { MOCK_DATA } from "../store/mockData"


const fetchTransactions = () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DATA), 3000));
}

const calculatePoints = (amount) => {
    if (amount <= 50) return 0;
    if (amount <= 100) return amount - 50;
    return (amount - 100) * 2 + 50;
};

const monthKey = (iso) => {
    const d = new Date(iso + "T00:00:00Z");
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
};


const monthLabel = (key) => {
    const [y, m] = key.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleString(undefined, { month: "short", year: "numeric" });
};

const aggregate = (transactions = []) => {
    const months = Array.from(new Set(transactions.map((t) => monthKey(t.date)))).sort();
    const byCustomer = new Map();


    transactions.forEach((t) => {
        const m = monthKey(t.date);
        const p = calculatePoints(t.amount);
        if (!byCustomer.has(t.customerId)) {
            byCustomer.set(t.customerId, {
                customerId: t.customerId,
                customer: t.customer,
                perMonth: new Map(),
                total: 0,
            });
        }
        const row = byCustomer.get(t.customerId);
        row.perMonth.set(m, (row.perMonth.get(m) || 0) + p);
        row.total += p;
    });


    const rows = Array.from(byCustomer.values()).sort((a, b) => a.customer.localeCompare(b.customer));
    return { months, rows };
};


export { fetchTransactions, monthLabel, aggregate };