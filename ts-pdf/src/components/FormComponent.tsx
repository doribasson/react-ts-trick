import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {generatePDF} from "../utils/generatePDF"

type FormValues = {
  name: string;
  email: string;
};

const FormComponent: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data); // Here you can handle the form data, e.g., pass it to PDF generation function
    await generatePDF(data); // Call the PDF generation function
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register('name', { required: true })} />
      {errors.name && <span>This field is required</span>}

      <label>Email:</label>
      <input type="email" {...register('email', { required: true })} />
      {errors.email && <span>This field is required</span>}

      <button type="submit">Generate PDF</button>
    </form>
  );
};

export default FormComponent;
