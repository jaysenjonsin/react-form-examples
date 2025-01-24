import { useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const employmentSchema = z.object({
  companyName: z.string().min(1, { message: 'company name required' }),
  jobTitle: z.string().min(1, { message: 'job title required.' }),
  startDate: z.date().refine((date) => new Date(date) <= new Date(), {
    message: 'valid start date required',
  }),
  endDate: z.date().refine((date) => new Date(date) <= new Date(), {
    message: 'valid end date required',
  }),
  rating: z.number().int().min(1).max(5),
});

export type employmentFormInputs = z.infer<typeof employmentSchema>;
type employmentFormProps = {
  onAdd: (entry: employmentFormInputs) => void;
};

const EmploymentForm = ({ onAdd }: employmentFormProps) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<employmentFormInputs>({
    resolver: zodResolver(employmentSchema),
  });

  const onSubmit: SubmitHandler<employmentFormInputs> = (data) => {
    onAdd(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className='formInput'>
        <label htmlFor='companyName'>Company Name:</label>
        <input id='companyName' {...register('companyName')} />
        {errors.companyName && (
          <p style={{ color: 'red' }}>{errors.companyName.message}</p>
        )}
      </div>

      {/* Job Title */}
      <div className='formInput'>
        <label htmlFor='jobTitle'>Job Title:</label>
        <input id='jobTitle' {...register('jobTitle')} />
        {errors.jobTitle && (
          <p style={{ color: 'red' }}>{errors.jobTitle.message}</p>
        )}
      </div>

      {/* Start Date */}
      <div className='formInput'>
        <label htmlFor='startDate'>Start Date:</label>
        <input id='startDate' {...register('startDate')} />
        {errors.startDate && (
          <p style={{ color: 'red' }}>{errors.startDate.message}</p>
        )}
      </div>

      {/* End Date */}
      <div className='formInput'>
        <label htmlFor='endDate'>End Date:</label>
        <input id='endDate' {...register('endDate')} />
        {errors.endDate && (
          <p style={{ color: 'red' }}>{errors.endDate.message}</p>
        )}
      </div>

      {/* Rating */}
      <div className='formInput'>
        <label htmlFor='rating'>Rating:</label>
        <input id='rating' {...register('rating')} />
        {errors.rating && (
          <p style={{ color: 'red' }}>{errors.rating.message}</p>
        )}
      </div>
      {/* current job check */}
      <div className='formInput'>
        <label>
          <input
            type='checkbox'
            checked={isCurrentJob}
            onChange={() => setIsCurrentJob(!isCurrentJob)}
          />
        </label>
      </div>

      <button type='submit'>Add employment</button>
    </form>
  );
};

export default EmploymentForm;
