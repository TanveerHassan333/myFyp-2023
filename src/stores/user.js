import { defineStore } from 'pinia';
import { storage, db, app,} from '../firebase/init'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      fullName: '',
      education: '',
      dob: '',
      address: '',
      profilePicture: '',
      certificatePics: [],
    },
  }),
  actions: {
    updateProfile(newProfile) {
      this.profile = newProfile;
    },
    updateProfilePicture(profilePicture) {
      this.profile.profilePicture = profilePicture;
    },
    updateCertificatePics(certificatePics) {
      this.profile.certificatePics = certificatePics;
    },
  },
});
