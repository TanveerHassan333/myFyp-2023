<template>
    <div class="container user-pro-container">
      <h1>Complete Your Profile</h1>
      <form @submit="saveProfile">
        <label for="Profile">Profile picture:</label><br>
          <input class="pt-1" type="file" id="profilePicture" placeholder="Profile picture" @change="handleProfilePicture" accept="image/*" required />
          <input v-model="profile.fullName" type="text" id="fullName" placeholder="Enter Your Full Name" required />
          <input v-model="profile.education" type="text" id="education" placeholder="Enter Your Higher Education details" required />
          <input v-model="profile.dob" type="date" id="dob" placeholder="Enter Your Date Of Birth" required/>
          <textarea class="address" v-model="profile.address" id="address" placeholder="Enter Your Address" required></textarea>
          <label for="certificates">Upload Any certificates or awards pictures:</label>
          <input class="mt-4 pt-1" type="file" id="certificatePics" @change="handleCertificatePics" accept="image/*" multiple /> <br>
          <p v-if="successMessage" class="success-message"> {{ successMessage }}</p>
        <button class="account-btn" type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
 import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storage } from '../firebase/init'; 
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/init';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const userStore = useUserStore();
    const profile = userStore.profile;
    const profilePictureRef = ref(null); 
    const router = useRouter()
    const successMessage = ref('');
    const certificatePictures = ref([]);

    const handleCertificatePics = async (event) => {
      const files = event.target.files;

      try {
        for (const file of files) {
          const storagePath = `certificate_pictures/${file.name}`;
          const storageFileRef = storageRef(storage, storagePath);

          await uploadBytes(storageFileRef, file);

          const downloadURL = await getDownloadURL(storageFileRef);
          certificatePictures.value.push(downloadURL);
        }
      } catch (error) {
        console.error('Error uploading certificate pictures:', error);
      }
    };


    const handleProfilePicture = async (event) => {
      const file = event.target.files[0];

      try {
        // Upload the file to Firebase Storage
        const storagePath = `profile_pictures/${file.name}`;
        const fileRef = storageRef(storage, storagePath);
        await uploadBytes(fileRef, file);

        // Get the download URL of the uploaded file
        const profilePictureUrl = await getDownloadURL(fileRef);

        // Update the profile picture URL in the store
        userStore.updateProfilePicture(profilePictureUrl);
        profilePictureRef.value = profilePictureUrl;
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    };

    // Other form handling functions

    const saveProfile = async (event) => {
  event.preventDefault();
  userStore.updateProfile(profile);

  try {
    // Save the profile data to Firestore
    const profileRef = doc(collection(db, 'profiles'), 'userProfile');
    await setDoc(profileRef, profile);

    successMessage.value = 'Profile saved successfully. Redirecting to home page...';

    setTimeout(() => {
      successMessage.value = '';
      router.push('/');
    }, 5000);
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

    return {
      profile,
      profilePictureRef,
      handleProfilePicture,
      successMessage,
      saveProfile,
      handleCertificatePics
      // Other return values
    };
  },
};

  </script>
  
  <style scoped>
 *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 }
 html{
  font-size: 15px;
 }
 .user-pro-container{
  box-shadow: none;
 }
 .user-pro-container h1{
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  text-align: center;
 }
 form{
  margin-left: 30%;
 }
 form input {
  width: 70%;
  border: 1px solid #FFDC5F;
  border-radius: 1.5rem;
  height: 2.5rem;
  padding-left: 1rem;
  outline: none;
  margin-top: 1.5rem;
}
form input:focus {
  border: 1px solid #FFDC5F;
}
form input::placeholder{
  color: gray;
  font-size: 0.95rem;
}
.address{
  width: 70%;
  border: 1px solid #FFDC5F;
  height: 5rem;
  margin-top: 1.5rem;
  border-radius: 0.8rem;
  padding: 0.4rem 0.9rem;
}
.account-btn{
  background-color: #FFDC5F;
  padding: 0.5rem 3.5rem;
  border: none;
  text-align: center;
  font-weight: 600;
  margin-top: 2rem;
  border-radius: 1.5rem;
}
  </style>
  