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

import styles from './Profile.scss';

class Profile extends Component {
  render() {
    return (
      <div className='Profile' style={{textAlign: 'center'}}>
        <Header as='h1'>Passport Authenication Demo</Header>
        <Segment>You are login!</Segment>
      </div>
    );
  }
}

export default Profile;
