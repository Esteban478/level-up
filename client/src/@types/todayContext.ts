export interface TodayContextType {
  isEditMode: boolean;
  isArchiveMode: boolean;
  setIsEditMode: (value: boolean) => void;
  setIsArchiveMode: (value: boolean) => void;
}