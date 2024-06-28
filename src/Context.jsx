// ProfileContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context object
const ProfileContext = createContext();

// Create a provider component
export const ProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null); // Initialize with null or initial profile data

    return (
        <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Custom hook to use the profile context
export const useProfileContext = () => useContext(ProfileContext);
