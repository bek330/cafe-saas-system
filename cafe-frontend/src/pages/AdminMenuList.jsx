/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminMenuList() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await API.get("/menu/all"); // we may need to add this
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const disableItem = async (id) => {
    if (!confirm("Disable this item?")) return;

    try {
      await API.put(`/menu/${id}/disable`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const enableItem = async (id) => {
  try {
    await API.put(`/menu/${id}/enable`);
    fetchItems();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <AdminLayout>
      <h1>Menu Items</h1>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #eee",
            padding: "10px 0",
          }}
        >
          <div>
            <strong>{item.name}</strong> - ${item.price}
            <br />
            Status: {item.is_available ? "Available" : "Unavailable"}
          </div>

          <button
            onClick={() =>
              item.is_available ? disableItem(item.id) : enableItem(item.id)
            }
          >
            {item.is_available ? "Disable" : "Enable"}
          </button>
        </div>
      ))}
    </AdminLayout>
  );
}

export default AdminMenuList;
