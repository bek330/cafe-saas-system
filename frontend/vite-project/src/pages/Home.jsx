import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { useNavigate } from "react-router-dom";


function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  

 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) {
  return<div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div> ;
}

  return (
    <div className="p-6">
      
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/menu/category/${cat.id}`)}
              className="cursor-pointer bg-gray-100 rounded-xl p-6 text-center hover:shadow-lg"
            >
              {cat.name}
            </div>
          ))}
        </div>
    </div>
  );
}

export default Home;
