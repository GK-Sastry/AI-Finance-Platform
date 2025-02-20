"use client";
import React from "react";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import { getAccountWithTransactions } from "@/actions/account";

export default function AccountPage({ params }) {
  const [accountData, setAccountData] = useState(null); // For storing fetched data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Use React.use() to unwrap params (to handle the Promise)
  const { id } = React.use(params); // Unwrap params to access id

  // Fetch data on component mount
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountWithTransactions(id);
        if (!data) {
          notFound(); // If no account data, show the 404 page
        } else {
          setAccountData(data); // Set the account data
        }
      } catch (err) {
        setError(err.message || "Failed to fetch account data");
        notFound(); // Handle errors and show 404
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAccountData();
  }, [id]); // Dependency on the account ID

  if (loading) {
    return <BarLoader className="mt-4" width={"100%"} color="#9333ea" />; // Loading spinner
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message if fetch fails
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-4">
        <AccountChart transactions={transactions} />
      </div>

      {/* Transactions Table */}
      <div className="mt-4">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
