import { useContext } from 'react';
import { TodayContext } from '../../context/Today';
import { TodayContextType } from '../../@types/todayContext';

export const useTodayContext = (): TodayContextType => {
  const context = useContext(TodayContext);
  if (context === undefined) {
    console.log('context not available');
    // Return default values when the context is not available
    return {
      isEditMode: false,
      isArchiveMode: false,
      setIsEditMode: () => {},
      setIsArchiveMode: () => {},
    };
  }
  return context;
};