 
import { useEffect, useState, useRef } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/categoryApi";
import { 
  Coffee, 
  Utensils, 
  GlassWater, 
  Cake, 
  Pizza, 
  Salad, 
  Soup, 
  Croissant, 
  Beef,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon
} from "lucide-react";

const iconMap = {
  Coffee: Coffee,
  Utensils: Utensils,
  GlassWater: GlassWater,
  Cake: Cake,
  Pizza: Pizza,
  Salad: Salad,
  Soup: Soup,
  Croissant: Croissant,
  Beef: Beef,
};

const iconOptions = Object.keys(iconMap);

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(iconOptions[0]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState(iconOptions[0]);

  // Image upload states
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const fileInputRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        }, "image/jpeg", 0.7);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async () => {
    if (!image) return null;
    const compressed = await compressImage(image);
    const formData = new FormData();
    formData.append("image", compressed);
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BASE_URL}/upload`);
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
        if (xhr.status === 200) resolve(JSON.parse(xhr.response));
        else reject("Upload failed");
      };
      xhr.onerror = () => {
        setUploadingImage(false);
        reject("Upload error");
      };
      xhr.send(formData);
    });
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    try {
      setSavingCategory(true);
      let imageUrl = null;
      let publicId = null;

      if (image) {
        const uploaded = await uploadImage();
        if (uploaded) {
          imageUrl = uploaded.imageUrl;
          publicId = uploaded.public_id;
        }
      }

      await createCategory({ 
        name, 
        icon, 
        image_url: imageUrl, 
        public_id: publicId 
      });
      
      resetForm();
      fetchCategories();
    } catch (err) {
      alert(err.message || "Failed to create");
    } finally {
      setSavingCategory(false);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditIcon(cat.icon || iconOptions[0]);
    setExistingImage(cat.image_url || "");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async () => {
    if (!editName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      setSavingCategory(true);
      let imageUrl = existingImage;
      let publicId = categories.find(c => c.id === editingId)?.public_id;

      if (image) {
        const uploaded = await uploadImage();
        if (uploaded) {
          imageUrl = uploaded.imageUrl;
          publicId = uploaded.public_id;
        }
      }

      await updateCategory(editingId, { 
        name: editName, 
        icon: editIcon,
        image_url: imageUrl,
        public_id: publicId
      });
      
      resetForm();
      fetchCategories();
    } catch (err) {
      alert(err.message || "Update failed");
    } finally {
      setSavingCategory(false);
    }
  };

  const resetForm = () => {
    setName("");
    setIcon(iconOptions[0]);
    setEditingId(null);
    setEditName("");
    setEditIcon(iconOptions[0]);
    setImage(null);
    setExistingImage("");
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this category?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  const IconRenderer = ({ name, className }) => {
    const IconComponent = iconMap[name] || Utensils;
    return <IconComponent className={className} />;
  };

  return (
    <div className="space-y-8 bg-cream min-h-screen p-6">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">Category manager</p>
          <h1 className="mt-3 text-4xl font-serif font-black text-charcoal">Manage Categories</h1>
          <p className="mt-2 text-sage italic">Create and organize your menu sections with unique images and icons.</p>
        </div>

        <div className="bg-cream/30 p-8 rounded-[2.5rem] border border-dashed border-sage/20">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Side: Name and Icon */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">
                  {editingId ? "Edit Category Name" : "Category Name"}
                </label>
                <input
                  placeholder="e.g. Breakfast"
                  value={editingId ? editName : name}
                  onChange={(e) => editingId ? setEditName(e.target.value) : setName(e.target.value)}
                  className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Select Icon</label>
                <div className="relative">
                  <select
                    value={editingId ? editIcon : icon}
                    onChange={(e) => editingId ? setEditIcon(e.target.value) : setIcon(e.target.value)}
                    className="w-full appearance-none rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all cursor-pointer pr-10"
                  >
                    {iconOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <IconRenderer name={editingId ? editIcon : icon} className="w-5 h-5 text-oat-gold" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Image Upload */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Category Image</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const file = e.dataTransfer.files[0];
                  if (file) setImage(file);
                }}
                className={`relative border-2 border-dashed p-4 rounded-3xl transition-all h-[130px] flex flex-col items-center justify-center ${
                  dragActive ? "border-oat-gold bg-oat-gold/5" : "border-sage/20 bg-white"
                }`}
              >
                {!image && !existingImage ? (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-sage/40 mx-auto mb-2" />
                    <p className="text-[10px] text-sage font-medium uppercase tracking-widest">Drop image or click</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={image ? URL.createObjectURL(image) : existingImage}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-2xl border-2 border-oat-gold/20"
                    />
                    <div className="flex-1">
                      <p className="text-[10px] text-charcoal font-black uppercase tracking-widest truncate">
                        {image ? image.name : "Current Image"}
                      </p>
                      <button 
                        onClick={() => { setImage(null); setExistingImage(""); if(fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-1 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
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
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-cream overflow-hidden rounded-b-3xl">
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
              onClick={editingId ? handleUpdate : handleCreate}
              disabled={uploadingImage || savingCategory}
              className="flex-1 rounded-full bg-charcoal px-8 py-5 text-sm font-black text-cream shadow-xl shadow-charcoal/20 transition hover:bg-charcoal/90 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {uploadingImage ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {uploadingImage ? "Uploading..." : savingCategory ? "Saving..." : editingId ? "Update Category" : "Add Category"}
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
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative flex flex-col md:flex-row gap-6 rounded-[2.5rem] border border-white bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Background Image Layer */}
            {cat.image_url && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                <img src={cat.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="relative z-10 flex items-center gap-6 flex-1">
              <div className="relative w-24 h-24 flex-shrink-0">
                {cat.image_url ? (
                  <img 
                    src={cat.image_url} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-[1.5rem] shadow-inner border border-oat-gold/10" 
                  />
                ) : (
                  <div className="w-full h-full bg-cream rounded-[1.5rem] flex items-center justify-center border border-dashed border-oat-gold/30">
                    <ImageIcon className="w-8 h-8 text-oat-gold/40" />
                  </div>
                )}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-50">
                  <IconRenderer name={cat.icon} className="w-5 h-5 text-charcoal" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-black text-charcoal group-hover:text-oat-gold transition-colors">{cat.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-[10px] text-sage font-black uppercase tracking-widest">Icon: {cat.icon || "Default"}</p>
                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  <p className="text-[10px] text-sage font-black uppercase tracking-widest">ID: #{cat.id}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 items-center">
              <button
                onClick={() => startEdit(cat)}
                className="flex-1 md:flex-none rounded-full bg-oat-gold px-6 py-3 text-xs font-black text-charcoal transition-all hover:bg-oat-gold/90 active:scale-95 flex items-center justify-center gap-2"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="flex-1 md:flex-none rounded-full bg-white border-2 border-red-50 px-6 py-3 text-xs font-black text-red-400 transition-all hover:bg-red-50 hover:border-red-100 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminCategories;
