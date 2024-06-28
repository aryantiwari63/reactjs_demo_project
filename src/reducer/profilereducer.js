// reducers/profileReducer.js
const initialState = {
    profileData: {},
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROFILE_DATA':
        console.log('Setting profile data:', action.payload);
        return {
          ...state,
          profileData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  