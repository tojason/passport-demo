import React, { Component } from 'react';
import {
  Header,
  Grid,
  Image,
  Input,
  Segment,
  Label,
  Button,
  Divider,
} from 'semantic-ui-react';
import axios from 'axios';

import styles from './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginUsername: '',
      loginPassword: '',
      isLogin: false,
    };

    this.controller = new AbortController()

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // axios.get('http://localhost:8081/api/auth/login/success')
    //   .then(res => {
    //     if (res.data.success) {
    //       this.setState({ isLogin: true });
    //     } else {
    //       this.setState({ isLogin: false });
    //       // throw new Error("failed to authenticate user");
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     this.setState({ isLogin: false });
    //   });
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  handleOnChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin() {
    // window.open("http://localhost:8081/auth/github", "_self");
    let loginCredential = {};
    loginCredential.username = this.state.loginUsername;
    loginCredential.password = this.state.loginPassword;
    axios.post("http://localhost:8081/api/auth/login", loginCredential)
      .then(res => {
        this.setState({
          isLogin: true,
          username: '',
          password: '',
        });
      })
      .catch(error => {
        console.error(error);
        alert('Login Failed: ' + error);
      });
  }

  handleSignup() {
    let newUser = {};
    newUser.username = this.state.username;
    newUser.password = this.state.password;
    axios.post("http://localhost:8081/api/auth/signup", newUser)
      .then(res => {
        if (res) {
          this.setState({
            username: '',
            password: '',
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({
          username: '',
          password: '',
        });
        alert('Sign-Up Error: ' + error.response.data.message);
      });
  }

  handleLogout() {
    axios.get("http://localhost:8081/api/auth/logout")
      .then(res => {
        this.setState({ isLogin: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='Home' style={{textAlign: 'center'}}>
        <Header as='h1'>Passport Authenication Demo</Header>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Or</Divider>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column className='inputForm'>
                <Header>
                  Sign up an account
                </Header>
                <Input label="Username" name="username"
                  value={this.state.username}
                  onChange={this.handleOnChange}/>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleOnChange}/>
                <Button primary onClick={this.handleSignup}>Sign Up</Button>
              </Grid.Column>

              <Grid.Column className='inputForm'>
                <Header>
                  Login
                </Header>
                <Input
                  label="Username"
                  name="loginUsername"
                  value={this.state.loginUsername}
                  onChange={this.handleOnChange}/>
                <Input
                  label="Password"
                  name="loginPassword"
                  type="password"
                  value={this.state.loginPassword}
                  onChange={this.handleOnChange}/>
                <Button primary onClick={this.handleLogin}>Login</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this.state.isLogin &&
          <Segment>
            You are login! &nbsp;
            <Button primary onClick={this.handleLogout}>Logout</Button>
          </Segment>
        }
      </div>
    );
  }
}

export default Home;
