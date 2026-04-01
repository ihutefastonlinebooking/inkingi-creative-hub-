import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

export interface AdminUser {
  uid: string
  email: string
  phone?: string
  role: 'admin'
}

export const loginAdmin = async (email: string, password: string) => {
  try {
    // Set persistence to LOCAL so user stays logged in
    await setPersistence(auth, browserLocalPersistence)
    const result = await signInWithEmailAndPassword(auth, email, password)
    
    // Verify user is admin
    const adminDoc = await getDoc(doc(db, 'admin', result.user.uid))
    if (!adminDoc.exists()) {
      await signOut(auth)
      throw new Error('Not an authorized admin')
    }
    
    return result.user
  } catch (error) {
    throw error
  }
}

export const logoutAdmin = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const subscribeToAuthState = (callback: (user: AdminUser | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const adminDoc = await getDoc(doc(db, 'admin', user.uid))
      if (adminDoc.exists()) {
        callback(adminDoc.data() as AdminUser)
      } else {
        await signOut(auth)
        callback(null)
      }
    } else {
      callback(null)
    }
  })
}

export const getCurrentUser = () => {
  return auth.currentUser
}
