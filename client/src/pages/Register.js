import React, { useState } from 'react';
import { Segment, Form, Button, Container } from 'semantic-ui-react';
import { FormProvider, useForm } from 'react-hook-form';
import { googleLogin } from '../services/user-services';
import { useNavigate} from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');

  const defaultValues = {
    name: '',
    email: '',
    password: '',
  };

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });

  const onSubmit = (e) => {
    console.log('fired');
    // navigate('/login')
  };
  return (
    <Segment>
      <Container>
        <Form size="big" onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="First Name"
              // value={email}
              type="text"
              // onChange={(e) => setEmail(e.target.value)}
              {...register('name')}
            />
            <p style={{ color: 'red' }}>{errors.name && 'Name is required.'}</p>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              // value={email}
              type="text"
              {...register('email')}
            />
            <p style={{ color: 'red' }}>{errors.email && 'Email is required.'}</p>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              // value={password}
              type="password"
              // onChange={(e) => setPassword(e.target.value)}
              {...register('email')}
            />
          </Form.Field>

          <Button type="submit" fluid size="large" color="teal" content="Login" />
        </Form>
        <Button fluid size="large" color="teal" content="Sign in instead?" onClick={googleLogin} />
      </Container>
    </Segment>
  );
};

export default Register;
