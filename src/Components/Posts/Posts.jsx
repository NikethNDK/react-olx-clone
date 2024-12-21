import React, { useEffect, useContext, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Posts() {
  const { db, storage } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        
        // Fetch products and their image URLs
        const productsPromises = querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          let imageUrl = '';
          
          // Only try to get URL if imageUrl exists in the document
          if (data.imageUrl) {
            try {
              const storageRef = ref(storage, data.imageUrl);
              imageUrl = await getDownloadURL(storageRef);
            } catch (imgError) {
              console.error("Error fetching image:", imgError);
              imageUrl = ''; // Set default image or empty string
            }
          }

          return {
            ...data,
            id: doc.id,
            imageUrl
          };
        });

        const allPosts = await Promise.all(productsPromises);
        setProducts(allPosts);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [db, storage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'path/to/fallback/image.jpg' // Add a fallback image
                    }}
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>
                  {product.createdAt?.seconds ? 
                    new Date(product.createdAt.seconds * 1000).toLocaleDateString() 
                    : 'Date not available'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
