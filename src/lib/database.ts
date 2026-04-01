import { db, storage } from '@/lib/firebase'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  writeBatch,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

// ============ LOGO ============
export interface Logo {
  id: string
  url: string
  uploadedAt: Date
}

export const uploadLogo = async (file: File): Promise<string> => {
  const timestamp = Date.now()
  const storageRef = ref(storage, `logo/${timestamp}_${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  
  // Save to Firestore
  await setDoc(doc(db, 'logo', 'current'), {
    url,
    uploadedAt: Timestamp.now(),
  })
  
  return url
}

export const getLogo = async (): Promise<Logo | null> => {
  const logoDoc = await getDoc(doc(db, 'logo', 'current'))
  return logoDoc.exists() ? (logoDoc.data() as Logo) : null
}

export const deleteLogo = async (url: string) => {
  // Extract path from URL
  const path = decodeURIComponent(url.split('/o/')[1]?.split('?')[0] || '')
  if (path) {
    await deleteObject(ref(storage, path))
  }
  await deleteDoc(doc(db, 'logo', 'current'))
}

// ============ HERO SLIDER ============
export interface Slide {
  id: string
  imageUrl: string
  title: string
  description: string
  order: number
  uploadedAt: Date
}

export const addSlide = async (file: File, title: string, description: string, order: number): Promise<string> => {
  const timestamp = Date.now()
  const slideId = `slide_${timestamp}`
  const storageRef = ref(storage, `slider/${slideId}`)
  const snapshot = await uploadBytes(storageRef, file)
  const imageUrl = await getDownloadURL(snapshot.ref)

  await setDoc(doc(db, 'slider', slideId), {
    imageUrl,
    title,
    description,
    order,
    uploadedAt: Timestamp.now(),
  })

  return slideId
}

export const getSlides = async (): Promise<Slide[]> => {
  const q = query(collection(db, 'slider'), orderBy('order', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
  })) as Slide[]
}

export const updateSlide = async (slideId: string, updates: Partial<Slide>) => {
  await updateDoc(doc(db, 'slider', slideId), updates)
}

export const deleteSlide = async (slideId: string, imageUrl: string) => {
  const path = decodeURIComponent(imageUrl.split('/o/')[1]?.split('?')[0] || '')
  if (path) {
    await deleteObject(ref(storage, path))
  }
  await deleteDoc(doc(db, 'slider', slideId))
}

// ============ CONTENT ============
export interface Content {
  about: string
  mission: string
  vision: string
  donationMessage: string
}

export const getContent = async (): Promise<Content | null> => {
  const contentDoc = await getDoc(doc(db, 'content', 'main'))
  return contentDoc.exists() ? (contentDoc.data() as Content) : null
}

export const updateContent = async (updates: Partial<Content>) => {
  await setDoc(doc(db, 'content', 'main'), updates, { merge: true })
}

// ============ EVENTS ============
export interface Event {
  id: string
  title: string
  date: Date
  description: string
  imageUrl?: string
  location?: string
  createdAt: Date
}

export const addEvent = async (
  title: string,
  date: string,
  description: string,
  location: string,
  file?: File
): Promise<string> => {
  const timestamp = Date.now()
  const eventId = `event_${timestamp}`
  let imageUrl = ''

  if (file) {
    const storageRef = ref(storage, `events/${eventId}`)
    const snapshot = await uploadBytes(storageRef, file)
    imageUrl = await getDownloadURL(snapshot.ref)
  }

  await setDoc(doc(db, 'events', eventId), {
    title,
    date: new Date(date),
    description,
    location,
    imageUrl,
    createdAt: Timestamp.now(),
  })

  return eventId
}

export const getEvents = async (): Promise<Event[]> => {
  const q = query(collection(db, 'events'), orderBy('date', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate() || new Date(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Event[]
}

export const updateEvent = async (eventId: string, updates: Partial<Event>) => {
  await updateDoc(doc(db, 'events', eventId), updates)
}

export const deleteEvent = async (eventId: string, imageUrl?: string) => {
  if (imageUrl) {
    const path = decodeURIComponent(imageUrl.split('/o/')[1]?.split('?')[0] || '')
    if (path) {
      await deleteObject(ref(storage, path))
    }
  }
  await deleteDoc(doc(db, 'events', eventId))
}

// ============ GALLERY ============
export interface GalleryImage {
  id: string
  url: string
  title?: string
  uploadedAt: Date
}

export const uploadGalleryImage = async (file: File, title?: string): Promise<string> => {
  const timestamp = Date.now()
  const imageId = `gallery_${timestamp}`
  const storageRef = ref(storage, `gallery/${imageId}`)
  const snapshot = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snapshot.ref)

  await setDoc(doc(db, 'gallery', imageId), {
    url,
    title: title || '',
    uploadedAt: Timestamp.now(),
  })

  return imageId
}

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
  })) as GalleryImage[]
}

export const deleteGalleryImage = async (imageId: string, url: string) => {
  const path = decodeURIComponent(url.split('/o/')[1]?.split('?')[0] || '')
  if (path) {
    await deleteObject(ref(storage, path))
  }
  await deleteDoc(doc(db, 'gallery', imageId))
}

// ============ PROJECTS ============
export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  category?: string
  createdAt: Date
}

export const addProject = async (
  title: string,
  description: string,
  category: string,
  file?: File
): Promise<string> => {
  const timestamp = Date.now()
  const projectId = `project_${timestamp}`
  let imageUrl = ''

  if (file) {
    const storageRef = ref(storage, `projects/${projectId}`)
    const snapshot = await uploadBytes(storageRef, file)
    imageUrl = await getDownloadURL(snapshot.ref)
  }

  await setDoc(doc(db, 'projects', projectId), {
    title,
    description,
    category,
    imageUrl,
    createdAt: Timestamp.now(),
  })

  return projectId
}

export const getProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Project[]
}

export const updateProject = async (projectId: string, updates: Partial<Project>) => {
  await updateDoc(doc(db, 'projects', projectId), updates)
}

export const deleteProject = async (projectId: string, imageUrl?: string) => {
  if (imageUrl) {
    const path = decodeURIComponent(imageUrl.split('/o/')[1]?.split('?')[0] || '')
    if (path) {
      await deleteObject(ref(storage, path))
    }
  }
  await deleteDoc(doc(db, 'projects', projectId))
}

// ============ TESTIMONIALS ============
export interface Testimonial {
  id: string
  name: string
  story: string
  imageUrl?: string
  createdAt: Date
}

export const addTestimonial = async (
  name: string,
  story: string,
  file?: File
): Promise<string> => {
  const timestamp = Date.now()
  const testimonialId = `testimonial_${timestamp}`
  let imageUrl = ''

  if (file) {
    const storageRef = ref(storage, `testimonials/${testimonialId}`)
    const snapshot = await uploadBytes(storageRef, file)
    imageUrl = await getDownloadURL(snapshot.ref)
  }

  await setDoc(doc(db, 'testimonials', testimonialId), {
    name,
    story,
    imageUrl,
    createdAt: Timestamp.now(),
  })

  return testimonialId
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Testimonial[]
}

export const updateTestimonial = async (testimonialId: string, updates: Partial<Testimonial>) => {
  await updateDoc(doc(db, 'testimonials', testimonialId), updates)
}

export const deleteTestimonial = async (testimonialId: string, imageUrl?: string) => {
  if (imageUrl) {
    const path = decodeURIComponent(imageUrl.split('/o/')[1]?.split('?')[0] || '')
    if (path) {
      await deleteObject(ref(storage, path))
    }
  }
  await deleteDoc(doc(db, 'testimonials', testimonialId))
}

// ============ MESSAGES ============
export interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: Date
}

export const addMessage = async (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
): Promise<string> => {
  const messageId = `msg_${Date.now()}`
  await setDoc(doc(db, 'messages', messageId), {
    name,
    email,
    phone,
    subject,
    message,
    createdAt: Timestamp.now(),
  })
  return messageId
}

export const getMessages = async (): Promise<Message[]> => {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Message[]
}

export const deleteMessage = async (messageId: string) => {
  await deleteDoc(doc(db, 'messages', messageId))
}

// ============ VOLUNTEERS ============
export interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  message?: string
  createdAt: Date
}

export const addVolunteer = async (
  name: string,
  email: string,
  phone: string,
  message?: string
): Promise<string> => {
  const volunteerId = `vol_${Date.now()}`
  await setDoc(doc(db, 'volunteers', volunteerId), {
    name,
    email,
    phone,
    message: message || '',
    createdAt: Timestamp.now(),
  })
  return volunteerId
}

export const getVolunteers = async (): Promise<Volunteer[]> => {
  const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Volunteer[]
}

export const deleteVolunteer = async (volunteerId: string) => {
  await deleteDoc(doc(db, 'volunteers', volunteerId))
}
