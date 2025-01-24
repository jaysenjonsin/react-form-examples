import React, { useState } from 'react';

interface EmploymentHistory {
  id: number;
  companyName: string;
  jobTitle: string;
  rating: number;
  startDate: string;
  endDate?: string;
}

const VanillaForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    rating: '',
    startDate: '',
    endDate: '',
  });

  const [employmentHistory, setEmploymentHistory] = useState<
    EmploymentHistory[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: string[] = [];
    const { companyName, jobTitle, rating, startDate, endDate } = formData;

    if (!companyName.trim()) errors.push('Company Name is required.');
    if (!jobTitle.trim()) errors.push('Job Title is required.');
    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      errors.push('Rating must be an integer between 1 and 5.');
    }
    if (!startDate || isNaN(new Date(startDate).getTime())) {
      errors.push('Start Date is required and must be a valid date.');
    }
    if (endDate && isNaN(new Date(endDate).getTime())) {
      errors.push('End Date must be a valid date.');
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      errors.push('Start Date cannot be after End Date.');
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newEntry: EmploymentHistory = {
      id: Date.now(),
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      rating: parseInt(formData.rating, 10),
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
    };

    setEmploymentHistory([...employmentHistory, newEntry]);
    setFormData({
      companyName: '',
      jobTitle: '',
      rating: '',
      startDate: '',
      endDate: '',
    });
    setErrors([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employment History</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name: </label>
          <input
            type='text'
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Job Title: </label>
          <input
            type='text'
            name='jobTitle'
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating (1-5): </label>
          <input
            type='number'
            name='rating'
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date: </label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date: </label>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Add Employment</button>
      </form>

      {errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <h2>Employment History</h2>
      <ul>
        {employmentHistory.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.companyName}</strong> ({entry.jobTitle}), Rating:{' '}
            {entry.rating}, Start: {entry.startDate}, End:{' '}
            {entry.endDate || 'Present'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VanillaForm;
