import { useEffect, useState, useRef } from "react";

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [existingImage, setExistingImage] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    public_id: "",
    category_id: "",
  });

  const token = localStorage.getItem("token");

  const fetchMenu = async () => {
    const res = await fetch("http://localhost:5000/menu");
    const data = await res.json();
    setItems(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchMenu();
      await fetchCategories();
    };

    loadData();
  }, []);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 800;
        const scale = Math.min(1, MAX_WIDTH / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.7, // compression quality
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async () => {
    if (!image) return null;

    const compressed = await compressImage(image);

    const formData = new FormData();
    formData.append("image", compressed);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", "http://localhost:5000/upload");

      setUploadingImage(true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploadProgress(false);

        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Upload failed");
        }
      };

      xhr.onerror = () => {
        setUploadingImage(false);

        reject("Upload error");
      };

      xhr.send(formData);
    });
  };
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category_id) {
      alert("All fields required");
      return;
    }
    let imageUrl = form.image_url;
    let publicId = form.public_id;

    try {
      // upload if new image selected
      if (image) {
        try {
          const uploaded = await uploadImage();

          if (uploaded && uploaded.imageUrl) {
            imageUrl = uploaded.imageUrl;
            publicId = uploaded.public_id || null;
          }
        } catch (err) {
          console.error("Upload failed:", err);
          alert("Image upload failed");
          return; // stop submit if upload fails
        }
      }

      const url = editingId
        ? `http://localhost:5000/menu/${editingId}`
        : "http://localhost:5000/menu";

      const method = editingId ? "PUT" : "POST";

      setSavingItem(true);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...form,
          image_url: imageUrl,
          price: Number(form.price),
          category_id: Number(form.category_id),
          public_id: publicId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed");
        return;
      }

      const savedItem = await res.json();

      if (editingId) {
        setSavingItem(false);
        setItems((prev) =>
          prev.map((item) => (item.id === savedItem.id ? savedItem : item)),
        );
      } else {
        setItems((prev) => [savedItem, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      image_url: "",
      public_id: "",
      category_id: "",
    });

    setExistingImage("");
    setEditingId(null);
    setImage(null);

    // 🔥 clear file input (this fixes your bug)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.image_url,
      public_id: item.public_id,
      category_id: item.category_id,
    });

    setExistingImage(item.image_url);
    setEditingId(item.id);
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleItem = async (id) => {
    await fetch(`http://localhost:5000/menu/toggle/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    });

    fetchMenu();
  };

  return (
    <div className="space-y-8">
      {" "}
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        {" "}
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">
          {" "}
          Menu manager{" "}
        </p>{" "}
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {" "}
          Manage menu items{" "}
        </h1>{" "}
        <p className="mt-2 text-slate-500">
          {" "}
          Create, edit, or toggle availability for menu items in the kitchen
          menu.{" "}
        </p>{" "}
      </section>{" "}
      <section className="rounded-[2rem] bg-white p-6 shadow-xl" aria-busy={uploadingImage || savingItem}>
        {" "}
        <label className="text-sm font-400 text-slate-900 mb-4">
              <legend className="text-xl font-semibold text-slate-900 mb-4">Item form</legend> 
          
        {" "}
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
           
          {" "}
          <div className="grid gap-4 md:grid-cols-2">
            {" "}
            
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />{" "}
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />{" "}
            {/* 📁 FILE UPLOAD */}{" "}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files[0];
                if (file) setImage(file);
              }}
              className={`border-2 border-dashed p-4 rounded ${
                dragActive ? "border-cyan-500 bg-cyan-50" : "border-slate-200"
              }`}
            >
              <p className="text-sm text-slate-500">
                Drag & drop image here or click to select
              </p>
              <input
                aria-label="Upload menu item image"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200"
                type="file"
                ref={fileInputRef}
              />{" "}
              {/* 👀 Preview */} {/* 👀 Current image (edit mode) */}
              {editingId && existingImage && !image && (
                <img
                  src={existingImage}
                  alt="current"
                  className="w-24 h-24 object-cover rounded mt-2"
                />
              )}
              {/* 👀 New preview */}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded mt-2 border-2 border-cyan-500"
                />
              )}{" "}
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded h-2 mt-2">
                  <div
                    className="bg-cyan-600 h-2 rounded transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>{" "}
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="md:col-span-2 h-28 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />{" "}
          </div>{" "}
          <div className="space-y-4">
            {" "}
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            >
              {" "}
              <option value="">Select category</option>{" "}
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {" "}
                  {c.name}{" "}
                </option>
              ))}{" "}
            </select>{" "}
            <button
              onClick={handleSubmit}
              className="w-full rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700"
            >
              {" "}
              {uploadingImage
                ? "Uploading image..."
                : savingItem
                  ? "Saving..."
                  : editingId
                    ? "Update item"
                    : "Add item"}{" "}
            </button>{" "}
            {editingId && (
              <button
                onClick={resetForm}
                className="w-full rounded-3xl bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                {" "}
                Cancel edit{" "}
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}</label>
      </section>{" "}
      <section className="grid gap-4">
        {" "}
        {items.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-6 shadow-xl text-slate-500">
            {" "}
            No menu items found.{" "}
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {" "}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {" "}
                <div>
                  {" "}
                  <p className="text-lg font-semibold text-slate-900">
                    {" "}
                    {item.name}{" "}
                  </p>{" "}
                  <p className="mt-1 text-sm text-slate-500">
                    {" "}
                    {item.description || "No description"}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="flex flex-wrap items-center gap-3">
                  {" "}
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {" "}
                    {item.is_available ? "Available" : "Unavailable"}{" "}
                  </span>{" "}
                  <span className="text-sm text-slate-500">
                    {" "}
                    {item.price} ETB{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {" "}
                <div className="text-sm text-slate-500">
                  {" "}
                  Category:{" "}
                  {categories.find((c) => c.id === item.category_id)?.name ||
                    "Unknown"}{" "}
                </div>{" "}
                <div className="flex flex-wrap gap-3">
                  {" "}
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    {" "}
                    Edit{" "}
                  </button>{" "}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    {" "}
                    {item.is_available ? "Disable" : "Enable"}{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))
        )}{" "}
      </section>{" "}
    </div>
  );
}

export default AdminMenu;
