import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign-in...');
      console.log('Firebase config check:', { 
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN 
      });
      
      // Open popup for Google sign-in
      const result = await signInWithPopup(auth, googleProvider);
      
      if (!result || !result.user) {
        throw new Error('No user data returned from Google sign-in');
      }
      
      const firebaseUser = result.user;
      
      console.log('Google sign-in successful!');
      console.log('User data:', {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });
      
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      };

      // Save user to backend (don't block on this)
      try {
        await saveUserToBackend(userData);
      } catch (backendError) {
        console.warn('Backend save failed, but login succeeded:', backendError.message);
      }
      
      // Update local state
      setUser(userData);
      
      console.log('Login complete - user state updated');
      return userData;
      
    } catch (error) {
      console.error('=== GOOGLE SIGN-IN ERROR ===');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by browser. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled. You closed the popup.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized. Add localhost to Firebase Console > Authentication > Settings.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Google sign-in is not enabled. Enable it in Firebase Console > Authentication > Sign-in method.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Multiple popups opened, ignore this one
        return null;
      }
      
      throw error;
    }
  };

  const saveUserToBackend = async (userData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('API URL:', API_URL);
      
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      console.log('Backend response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error response:', errorText);
        throw new Error(`Failed to save user: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Backend response:', result);
      return result;
    } catch (error) {
      console.error('Error saving user to backend:', error);
      // Don't throw here - allow login to succeed even if backend save fails
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
