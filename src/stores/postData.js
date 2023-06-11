// blogStore.js
import { defineStore } from 'pinia';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    isSharing: false,
    isProfessionalUser: false,
  }),
  getters: {
    allowedToShare(state) {
      return state.isProfessionalUser;
    },
  },
  actions: {
    async shareBlog({ textData, imageData }) {
      try {
        if (!this.allowedToShare) {
          throw new Error('Only professional users are allowed to share blogs.');
        }

        // Start the sharing process
        this.isSharing = true;

        // Generate a unique ID for the blog
        const blogId = generateUniqueId();

        // Prepare the blog data to be submitted to Firestore
        const blogPayload = {
          id: blogId,
          textData,
        };

        // Submit the blog data to Firestore
        const blogsCollection = collection(db, 'blogs');
        await addDoc(blogsCollection, blogPayload);

        // Upload the image data and get the download URL
        if (imageData) {
          const imageRef = ref(storage, `blogs/${blogId}.jpg`);
          await uploadBytes(imageRef, imageData);

          // Get the download URL for the image
          const downloadURL = await getDownloadURL(imageRef);

          // Update the blog data with the image URL
          blogPayload.imageUrl = downloadURL;
          await updateDoc(doc(blogsCollection, blogId), blogPayload);
        }

        // Reset the sharing process and display success message
        this.isSharing = false;
        console.log('Blog shared successfully!');
      } catch (error) {
        // Handle any error that occurs during sharing
        this.isSharing = false;
        console.error('Error sharing blog:', error);
      }
    },
  },
});

// Helper function to generate a unique ID for the blog
function generateUniqueId() {
  // Generate a unique ID here (you can use a library like uuid or a custom logic)
  // Return the generated ID
}
