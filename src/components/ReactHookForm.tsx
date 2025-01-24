import React, { useEffect, useState } from 'react';
import EmploymentForm, { employmentFormInputs } from './EmploymentForm';
import { EmploymentHistoryEntry } from './EmploymentHistory';

type Props = {};

const ReactHookForm = (props: Props) => {
  const [employmentHistory, setEmploymentHistory] = useState<
    EmploymentHistoryEntry[]
  >([]);

  //persist employment history
  useEffect(() => {
    const storedData = localStorage.getItem('employmentHistory');
    if (storedData) {
      setEmploymentHistory(JSON.parse(storedData));
    }
  }, []);
  const handleAddEmployment = (data: employmentFormInputs) => {
    const newEntry;
  };
  return (
    <>
      <EmploymentForm />
    </>
  );
};

export default ReactHookForm;
