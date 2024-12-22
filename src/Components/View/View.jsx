
import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postDetails) {
      navigate('/'); // Redirect if no post details
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const userQuery = query(
          collection(db, 'users'),
          where('id', '==', postDetails.userId)
        );
        const userSnapshot = await getDocs(userQuery);
        
        if (!userSnapshot.empty) {
          setUserDetails(userSnapshot.docs[0].data());
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [postDetails, db, navigate]);

  if (!postDetails) return null;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>
            {postDetails.createdAt?.seconds 
              ? new Date(postDetails.createdAt.seconds * 1000).toLocaleDateString()
              : 'Date not available'}
          </span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username || 'No name'}</p>
            <p>{userDetails.phone || 'No phone number'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
