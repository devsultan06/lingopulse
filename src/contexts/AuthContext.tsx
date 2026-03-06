import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import i18n from "i18next";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateLanguage: (newLang: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Fetch existing user data to check for saved language
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists() && userDoc.data().language) {
          i18n.changeLanguage(userDoc.data().language);
        }

        // Sync user profile to Firestore
        try {
          await setDoc(
            doc(db, "users", firebaseUser.uid),
            {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
              lastSeen: serverTimestamp(),
              isOnline: true,
              language: i18n.language,
            },
            { merge: true },
          );
        } catch (error) {
          console.error("Error syncing user profile:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateLanguage = async (newLang: string) => {
    i18n.changeLanguage(newLang);
    if (user) {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { language: newLang },
          { merge: true },
        );
      } catch (error) {
        console.error("Error updating language preference:", error);
      }
    }
  };

  const signOut = async () => {
    if (user) {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { isOnline: false, lastSeen: serverTimestamp() },
          { merge: true },
        );
      } catch (error) {
        console.error("Error updating offline status:", error);
      }
    }
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
