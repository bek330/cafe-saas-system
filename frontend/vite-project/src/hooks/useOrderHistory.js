/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getOrderHistory } from "../api/orderApi.js";

export default function useOrderHistory() {
    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [status, setStatus] = useState("all");
    const [range, setRange] = useState("all");

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);


    const [autoRefresh, setAutoRefresh] = useState(true);

    const limit = 10;

    // 🔁 debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // 📡 fetch
    const fetchHistory = async () => {
        try {
            setLoading(true);

            const data = await getOrderHistory(
                {
                    range,
                    status,
                    search: debouncedSearch,
                    page,
                    limit,
                    from,
                    to,
                },
                localStorage.getItem("token")
            );

            setOrders(data.data || []);
            setTotalPages(data.pages || 1);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔄 auto fetch
    useEffect(() => {
        fetchHistory();
    }, [range, status, debouncedSearch, page, from, to]);
    
    // 🔁 auto refresh every 5 seconds
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            fetchHistory();
        }, 5000);

        return () => clearInterval(interval);
    }, [autoRefresh, range, status, debouncedSearch, page, from, to])

    return {
        orders,
        loading,

        search,
        setSearch,

        status,
        setStatus,

        range,
        setRange,

        from,
        setFrom,

        to,
        setTo,

        page,
        setPage,

        totalPages,

        fetchHistory,

        autoRefresh,
        setAutoRefresh,
    };

    ;
}