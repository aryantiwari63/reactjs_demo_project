// actions/profileActions.js

export const setProfileData = (profileData) => ({
    type: 'SET_PROFILE_DATA',
    payload: profileData,
  });

  export const fetchProfildata = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
  
        // Check if token exists
        if (!token) {
          throw new Error('No token found');
        }
  
        // Make the request with the Authorization header
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserProfile(response.data);
        setProfileData(response.data); 
        console.log('this is profile data',response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    