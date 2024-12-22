import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [loading, setLoading] = useState(false); // State for loading
  const navigate=useNavigate()

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    setLoading(true);

    //Upload image to Firebase Storage
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setLoading(false);
        alert("Image upload failed. Please try again.");
      },
      async () => {
        //Get the download URL of the uploaded image
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Corrected this line

          //Create a Firestore document with the image URL and other data
          const docRef = await addDoc(collection(db, "products"), {
            name,
            category,
            price,
            imageUrl: downloadURL,
            userId: user?.uid,
            createdAt: new Date(),
          });

          //Update success message and reset form
          setSuccessMessage("Upload successful! Product has been added.");
          setName('');
          setCategory('');
          setPrice('');
          setImage(null);
          setLoading(false);
        } catch (error) {
          console.error("Error adding document: ", error);
          setLoading(false);
          alert("Error adding product. Please try again.");
        }
        navigate('/');
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
            placeholder="Enter product name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            placeholder="Enter product category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="price"
            name="Price"
            placeholder="Enter product price"
          />
          <br />
        </form>
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        {successMessage && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            {successMessage}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="uploadBtn"
          disabled={loading} // Disable the button while uploading
        >
          {loading ? 'Uploading...' : 'Upload and Submit'}
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
