import { useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const employmentSchema = z.object({
  companyName: z.string().min(1, { message: 'company name required' }),
  jobTitle: z.string().min(1, { message: 'job title required.' }),
  startDate: z.string().refine((date) => new Date(date) <= new Date(), {
    message: 'valid start date required',
  }),
  endDate: z
    .string()
    .optional()
    .refine((date) => new Date(date) <= new Date(), {
      message: 'valid end date required',
    }),
  rating: z
    .number()
    .int()
    .min(1, 'pick valid number')
    .max(5, 'pick valid number'),
});

export type employmentFormInputs = z.infer<typeof employmentSchema>;
type employmentFormProps = {
  onAdd: (entry: employmentFormInputs) => void;
};

const EmploymentForm = ({ onAdd }: employmentFormProps) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const {
    control,
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
        <input id='startDate' type='date' {...register('startDate')} />
        {errors.startDate && (
          <p style={{ color: 'red' }}>{errors.startDate.message}</p>
        )}
      </div>

      {/* End Date */}
      <div className='formInput'>
        <label htmlFor='endDate'>End Date:</label>
        <input
          id='endDate'
          type='date'
          disabled={isCurrentJob}
          {...register('endDate')}
        />
        {errors.endDate && (
          <p style={{ color: 'red' }}>{errors.endDate.message}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label htmlFor='rating'>Rating (1-5)</label>
        <Controller
          name='rating'
          control={control}
          render={({ field }) => (
            <select id='rating' {...field}>
              <option value=''>Select rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          )}
        />
        {errors.rating && <span>{errors.rating.message}</span>}
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
