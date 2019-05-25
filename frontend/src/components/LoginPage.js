import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';



class LoginPage extends React.Component{
  constructor(){
    super()
    
    this.state = {
      loggedIn: false,
      loginError: null,
    }
  }

  onFormLogin = (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (!username || !password){
      this.setState({loginError: true})
    } 
    
    fetch('http://68.183.106.71/login', {
      method: 'post',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({username: username, password: password})
  }).then(response => console.log(response))
  
  }

  render(){
    
    return(


      <div className='login-form'>
      {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
      </style>
      { this.state.loginError &&  
        <Segment inverted color='red'>
          There is an issue with your scredentials - please try again  
        </Segment>
      }
  
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
     
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.onFormLogin}>
            <Segment stacked>
              <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='username' 
              id='username' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                id='password'
              />
  
              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Need an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>       
    )
  }
}


export default LoginPage