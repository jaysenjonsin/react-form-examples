import React, { useEffect, useState } from 'react';
import EmploymentForm, { employmentFormInputs } from './EmploymentForm';
import EmploymentHistory, { EmploymentHistoryEntry } from './EmploymentHistory';

type Props = {};

const ReactHookForm = (props: Props) => {
  const [employmentHistory, setEmploymentHistory] = useState<
    EmploymentHistoryEntry[]
  >([]);

  //Initial load of employment history + persistence on page refresh
  useEffect(() => {
    const storedData = localStorage.getItem('employmentHistory');
    if (storedData) {
      setEmploymentHistory(JSON.parse(storedData));
    }
  }, []);

  //update local storage when employment history is added or deleted
  useEffect(() => {
    localStorage.setItem(
      'employmentHistory',
      JSON.stringify(employmentHistory)
    );
  }, [employmentHistory]);

  const handleAddEmployment = (data: employmentFormInputs) => {
    const newEntry: any = {
      id: Date.now(),
      ...data,
    };
    setEmploymentHistory((prev) => [...prev, newEntry]);
  };

  const handleDeleteEmployment = (id: EmploymentHistoryEntry['id']) => {
    setEmploymentHistory((prev) => prev.filter((el) => el.id !== id));
  };
  return (
    <>
      <EmploymentForm onAdd={handleAddEmployment} />
      <EmploymentHistory
        history={employmentHistory}
        onDelete={handleDeleteEmployment}
      />
    </>
  );
};

export default ReactHookForm;
