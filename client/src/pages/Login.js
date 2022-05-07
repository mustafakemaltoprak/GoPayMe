import React, {useState} from 'react'
import { Segment, Form, Button, Container } from 'semantic-ui-react';
import { googleLogin } from '../services/user-services';


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const submitHandler = (e)=> {
    console.log(e.target.value)
  }
  return (
    <Segment>
      <Container>
        <Form size="big" onSubmit={submitHandler}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="First Name"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>

          <Button type="submit" fluid size="large" color="teal" content="Login" />
        </Form>
        <Button fluid size="large" color="teal" content="Login with Google" onClick={googleLogin} />
      </Container>
    </Segment>
  );
}

export default Login