import React, { useEffect, useMemo, useState } from "react";
import { fetchTransactions, aggregate } from "./utils/rewardsUtils";
import RewardsTable from "./components/RewardsTable";
import './index.css';


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetchTransactions().then((r) => {
      setTransactions(r);
      setLoading(false);
    });
  }, []);


  const { months, rows } = useMemo(() => aggregate(transactions), [transactions]);


  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(
      (r) => r.customer.toLowerCase().includes(term) || r.customerId.toLowerCase().includes(term)
    );
  }, [rows, search]);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-xl font-bold">Customer Rewards Program</h1>
          <input
            className="w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by name or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        {loading ? (
          <div className="text-sm text-gray-600">Loading…</div>
        ) : (
          <RewardsTable months={months} rows={filteredRows} />
        )}
      </div>
    </div>
  );
};

export default App
