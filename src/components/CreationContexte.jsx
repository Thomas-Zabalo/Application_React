import React, { createContext, useContext, useState } from 'react';

const CreationContext = createContext();

export function useCreation() {
    return useContext(CreationContext);
}

export const CreationProvider = ({ children }) => {
    const [stepCompleted, setStepCompleted] = useState({ race: false });

    return (
        <CreationContext.Provider value={{ stepCompleted, setStepCompleted }}>
            {children}
        </CreationContext.Provider>
    );
};
