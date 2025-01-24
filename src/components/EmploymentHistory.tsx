import React from 'react';

export type EmploymentHistoryEntry = {
  id: number;
  companyName: string;
  jobTitle: string;
  rating: number;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
};
type EmploymentHistoryProps = {
  history: EmploymentHistoryEntry[];
  onDelete: (id:EmploymentHistoryEntry['id'])
};

const EmploymentHistory = ({
  history,
  onDelete,
}: EmploymentHistoryPropsProps) => {
  return <div>EmploymentHistory</div>;
};

export default EmploymentHistory;
