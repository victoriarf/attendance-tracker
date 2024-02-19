import { useEffect, useState } from 'react';

const CLASSES_CHECKED_KEY = 'classesChecked';

const useCheckedClasses = () => {
  const checkedClasses = localStorage.getItem(CLASSES_CHECKED_KEY);
  const initialCheckedState = (checkedClasses && JSON.parse(checkedClasses)) || {};

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(initialCheckedState);

  useEffect(() => {
    localStorage.setItem(CLASSES_CHECKED_KEY, JSON.stringify(checkedState));
  }, [checkedState]);

  const handleCheckboxChange = (classId: string) => {
    setCheckedState(prevState => ({
      ...prevState,
      [classId]: !prevState[classId] || false,
    }));
  };

  return { checkedState, handleCheckboxChange };
};

export default useCheckedClasses;
