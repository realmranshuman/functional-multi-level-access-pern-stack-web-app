import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import 'bootstrap/dist/css/bootstrap.css';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*]{8,})$/, 'Password must be alphanumeric and can contain special characters.')
    .required('Required'),
});

const SuccessMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
};

export default function SignUp() {
  let navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-md-6">
        <h1>Sign Up</h1>
        <SuccessMessage message={successMessage} />
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            authService.signUp(values.username, values.email, values.password)
              .then(user => {
                setSubmitting(false);
                // Show success message
                setSuccessMessage('User was registered successfully!');
                // Redirect to /signin after 3 seconds
                setTimeout(() => navigate('/signin'), 3000);
              })
              .catch(err => {
                setSubmitting(false);
                // Show error message
                alert(err.message);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
