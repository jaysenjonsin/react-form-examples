import React from 'react';

export interface EmploymentHistoryEntry {
  id: number;
  companyName: string;
  jobTitle: string;
  rating: number;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
}

interface EmploymentHistoryProps {
  history: EmploymentHistoryEntry[];
  onDelete: (id: number) => void;
}

const EmploymentHistory: React.FC<EmploymentHistoryProps> = ({
  history,
  onDelete,
}) => {
  const sortedHistory = [...history].sort((a, b) => {
    const startA = new Date(a.startDate).getTime();
    const startB = new Date(b.startDate).getTime();
    return startB - startA; // Reverse chronological order
  });

  return (
    <div>
      <h2>Employment History</h2>
      {sortedHistory.length > 0 ? (
        <ul>
          {sortedHistory.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.companyName}</strong> - {entry.jobTitle} <br />
              Rating: {entry.rating} <br />
              Start Date: {entry.startDate} <br />
              End Date: {entry.endDate || 'Present'} <br />
              {entry.isCurrent && <span>(Current Job)</span>}
              <button onClick={() => onDelete(entry.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employment history added yet.</p>
      )}
    </div>
  );
};

export default EmploymentHistory;
