/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminMenuList() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

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
  const startEdit = (item) => {
    setEditingItem(item);
  };
  const handleUpdate = async () => {
    try {
      await API.put(`/menu/${editingItem.id}`, {
        ...editingItem,
        price: Number(editingItem.price),
        category_id: Number(editingItem.category_id),
      });

      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1>Menu Items</h1>

      {items.map((item) => (
        <div key={item.id}>
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
          <button onClick={() => startEdit(item)}>Edit</button>
        </div>
      ))}
      {editingItem && (
        <div>
          <h2>Edit Item</h2>

          <input
            value={editingItem.name}
            onChange={(e) =>
              setEditingItem({ ...editingItem, name: e.target.value })
            }
            placeholder="Name"
          />
          <br />
          <br />

          <input
            value={editingItem.description}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                description: e.target.value,
              })
            }
            placeholder="Description"
          />
          <br />
          <br />

          <input
            value={editingItem.price}
            onChange={(e) =>
              setEditingItem({ ...editingItem, price: e.target.value })
            }
            placeholder="Price"
          />
          <br />
          <br />

          <input
            value={editingItem.image_url}
            onChange={(e) =>
              setEditingItem({ ...editingItem, image_url: e.target.value })
            }
            placeholder="Image URL"
          />
          <br />
          <br />

          <button onClick={handleUpdate}>Save</button>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminMenuList;
