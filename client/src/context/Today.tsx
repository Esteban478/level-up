import { createContext, useState } from 'react';
import { TodayContextType } from '../@types/todayContext';

export const TodayContext = createContext<TodayContextType | undefined>(undefined);

export const TodayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isArchiveMode, setIsArchiveMode] = useState(false);

  return (
    <TodayContext.Provider value={{ isEditMode, isArchiveMode, setIsEditMode, setIsArchiveMode }}>
      {children}
    </TodayContext.Provider>
  );
};