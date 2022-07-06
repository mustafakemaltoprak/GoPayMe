import React, { useState, useRef } from 'react';
import { Segment, Form, Button, Container, Grid, Header } from 'semantic-ui-react';
import { FormProvider, useForm } from 'react-hook-form';
import { emailLogin, googleLogin } from '../services/user-services';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
const Login = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const defaultValues = {
    email: '',
    password: '',
  };
  
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues,
    delayError: 500,
    mode: 'onChange',
  });
 
  const onSubmit = async (formObj) => {
    console.log('fired', formObj);
    const data = await emailLogin(formObj);
    
    if (data) {
      if (user.register) {
        
        dispatch(loginUser(data));
        history.push('/categories');
      } else {
        
        dispatch(loginUser(data));
        history.push('/home');
      }
  
      reset();
      toast.success('login successful!');
    }
  };

  const handlegoogleLogin = async() => {
    const data = await googleLogin()
     dispatch(loginUser(data));
  }
  return (
   
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid columns={2} divided style={{ height: '100vh' }} >
        <Grid.Column
          className="loginTexting"
          style={{
            // border: 'red 1px solid',
            height: '100%',
            color: 'white',
            backgroundRepeat: 'no-repeat',
            backgroundSize:"cover",
            objectFit: 'cover',
            opacity: '0.9',
            // 'place-self': 'center',
            backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/300/850/333/help-for-a-stormtrooper-wallpaper-preview.jpg")`,
          }}
        >
          <Container
            style={{
              display: 'flex',
              // justifyContent: 'center',
              alignItems: 'center',
              'flex-direction': 'column',
              marginTop: '30%',
              // color: 'white',

            }}
            className='logintext'
          >
            <Header size="huge" style={{color: 'white', fontSize: '4rem', textAlign: 'center'}}>Make Friends and Raise Funds</Header>
            <Header size="medium" style={{color: 'white'}}>Support good causes</Header>
            <Header size="medium" style={{ marginTop: '0', color: 'white' }}>
              Make friends
            </Header>
            <Header size="medium" style={{ marginTop: '0', color: 'white' }}>
              Achieve your goals
            </Header>
            <Header size="medium" style={{ marginTop: '0', color: 'white' }}>
              Contribute with the community!
            </Header>
          </Container>
        </Grid.Column>
        <Grid.Column style={{ 'place-self': 'center' }}>
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form size="big" onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '30vw' }}>
              {/* <h1>Welcome to GoPayME</h1> */}
              <Header size="huge">Welcome to GoPayME</Header>
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
                
                  type="password"
                 
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
                onClick={handlegoogleLogin}
                style={{ marginTop: '1.2rem' }}
                icon="google"
              />
              <Button
                fluid
                size="large"
                color="blue"
                content="Register?"
                onClick={() => history.push('/register')}
                style={{ marginTop: '1.2rem' }}
              />
            </Form>
          </Container>
        </Grid.Column>
      </Grid>
    </motion.div>
  );
};
export default Login;
