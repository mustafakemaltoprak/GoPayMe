import React, { useState } from 'react';
import { Segment, Form, Button, Container, Grid } from 'semantic-ui-react';
import { FormProvider, useForm } from 'react-hook-form';
import { emailLogin, googleLogin } from '../services/user-services';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    delayError: 500,
    mode: 'onChange',
  });

  const onSubmit = (formObj) => {
    console.log('fired');
    const data = emailLogin(formObj);
    if (data) {
      history.push('/categories');
      reset();
    }
  };

  return (
    <Grid style={{ height: '100vh' }}>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
        <Form size="big" onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '30vw' }}>
          <h1>Login</h1>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              // value={email}
              type="text"
              {...register('email', { required: 'Email is required.' })}
            />
            <p style={{ color: 'red' }}>{errors.email?.message}</p>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              // value={password}
              type="password"
              // onChange={(e) => setPassword(e.target.value)}
              {...register('password', { required: 'Password is required.' })}
            />
            <p style={{ color: 'red' }}>{errors.password?.message}</p>
          </Form.Field>
          <Button type="submit" fluid size="large" color="teal" content="Login" />
          <Button
            fluid
            size="large"
            color="teal"
            content="Login with Google?"
            onClick={googleLogin}
            style={{ marginTop: '1.2rem' }}
          />
          <Button
            fluid
            size="large"
            color="blue"
            content="Sign In?"
            onClick={() => history.push('/register')}
            style={{ marginTop: '1.2rem' }}
          />
        </Form>
      </Container>
    </Grid>
  );
};

export default Login;
