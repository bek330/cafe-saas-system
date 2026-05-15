import { useEffect, useState, useRef } from "react";
import { getMenuItems, createMenuItem, updateMenuItem, toggleMenuItemAvailability } from "../api/menuApi";
import { getCategories } from "../api/categoryApi";
import { 
  UtensilsCrossed, 
  Plus, 
  Edit2, 
  Power, 
  PowerOff,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  X,
  Layers
} from "lucide-react";

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

  const fetchMenu = async () => {
    try {
      const data = await getMenuItems();
      setItems(data);
    } catch (err) {
      console.error("Fetch menu error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
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

    const API = import.meta.env.VITE_API_URL;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", `${API}/upload`);

      setUploadingImage(true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploadProgress(0);
        setUploadingImage(false);

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

      setSavingItem(true);

      const itemData = {
        ...form,
        image_url: imageUrl,
        price: Number(form.price),
        category_id: Number(form.category_id),
        public_id: publicId,
      };

      let savedItem;
      if (editingId) {
        savedItem = await updateMenuItem(editingId, itemData);
      } else {
        savedItem = await createMenuItem(itemData);
      }

      if (editingId) {
        setItems((prev) =>
          prev.map((item) => (item.id === savedItem.id ? savedItem : item)),
        );
      } else {
        setItems((prev) => [savedItem, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.message || "Failed to save item");
    } finally {
      setSavingItem(false);
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
    try {
      await toggleMenuItemAvailability(id);
      fetchMenu();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };


  return (
    <div className="space-y-8 bg-cream min-h-screen p-6">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">Menu manager</p>
          <h1 className="mt-3 text-4xl font-serif font-black text-charcoal">Manage Menu Items</h1>
          <p className="mt-2 text-sage italic">Create, edit, or toggle availability for items in your digital menu.</p>
        </div>

        <div className="bg-cream/30 p-8 rounded-[2.5rem] border border-dashed border-sage/20">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Item Name</label>
                <input
                  placeholder="e.g. Avocado Toast"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Price (ETB)</label>
                  <input
                    placeholder="250"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="w-full appearance-none rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="">Select...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Description</label>
                <textarea
                  placeholder="Tell guests about this dish..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-[2rem] border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all h-32 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Item Image</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const file = e.dataTransfer.files[0];
                  if (file) setImage(file);
                }}
                className={`relative border-2 border-dashed p-4 rounded-[2rem] transition-all h-[320px] flex flex-col items-center justify-center ${
                  dragActive ? "border-oat-gold bg-oat-gold/5" : "border-sage/20 bg-white"
                }`}
              >
                {!image && !existingImage ? (
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-sage/40 mx-auto mb-4" />
                    <p className="text-[10px] text-sage font-black uppercase tracking-widest">Drop dish image or click</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full p-2">
                    <img
                      src={image ? URL.createObjectURL(image) : existingImage}
                      alt="preview"
                      className="w-full h-full object-cover rounded-[1.5rem] border-2 border-oat-gold/20"
                    />
                    <button 
                      onClick={() => { setImage(null); setExistingImage(""); if(fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                
                {uploadProgress > 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-cream overflow-hidden rounded-b-[2rem]">
                    <div 
                      className="h-full bg-oat-gold transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={uploadingImage || savingItem}
              className="flex-1 rounded-full bg-charcoal px-8 py-5 text-sm font-black text-cream shadow-xl shadow-charcoal/20 transition hover:bg-charcoal/90 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {uploadingImage ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {uploadingImage ? "Uploading..." : savingItem ? "Saving..." : editingId ? "Update Item" : "Add Menu Item"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="rounded-full bg-white border-2 border-slate-100 px-8 py-5 text-sm font-black text-charcoal uppercase tracking-widest transition hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        {items.length === 0 ? (
          <div className="rounded-[2.5rem] bg-white p-12 text-center border border-dashed border-sage/20 shadow-sm">
            <UtensilsCrossed className="w-12 h-12 text-sage/20 mx-auto mb-4" />
            <p className="text-sage font-medium italic">No menu items found. Start by adding one above!</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col md:flex-row gap-6 rounded-[2.5rem] border border-white bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 flex-1">
                <div className="relative w-32 h-32 flex-shrink-0">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className={`w-full h-full object-cover rounded-[1.5rem] shadow-inner border border-oat-gold/10 ${!item.is_available && 'grayscale opacity-60'}`} 
                    />
                  ) : (
                    <div className="w-full h-full bg-cream rounded-[1.5rem] flex items-center justify-center border border-dashed border-oat-gold/30">
                      <ImageIcon className="w-8 h-8 text-oat-gold/40" />
                    </div>
                  )}
                  {!item.is_available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-charcoal/80 text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-lg">Sold Out</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h3 className="text-2xl font-serif font-black text-charcoal group-hover:text-oat-gold transition-colors">{item.name}</h3>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="text-lg font-bold text-oat-gold">{item.price} ETB</span>
                  </div>
                  <p className="text-sage text-sm italic line-clamp-2 mb-3">{item.description || "No description provided."}</p>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                    <div className="flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 border border-oat-gold/10">
                      <Layers className="w-3 h-3 text-sage" />
                      <span className="text-[10px] text-sage font-black uppercase tracking-widest">
                        {categories.find((c) => c.id === item.category_id)?.name || "Uncategorized"}
                      </span>
                    </div>
                    <p className="text-[10px] text-sage font-black uppercase tracking-widest">ID: #{item.id}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-row md:flex-col gap-2 justify-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 rounded-full bg-oat-gold px-6 py-3 text-xs font-black text-charcoal transition-all hover:bg-oat-gold/90 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`flex-1 rounded-full px-6 py-3 text-xs font-black transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    item.is_available 
                    ? "bg-white border-2 border-red-50 text-red-400 hover:bg-red-50" 
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}
                >
                  {item.is_available ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                  {item.is_available ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AdminMenu;
