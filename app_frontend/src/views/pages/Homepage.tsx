import React from 'react';
import MainTemplate from '../../templates/MainTemplate';
import Switcher from '../../components/Atoms/Switcher/Switcher';

const Homepage = () => (
  // @ts-ignore
  <MainTemplate>
    <h3>Homepage</h3>
    <Switcher name="mySwitch" switchColor="red" notCheckedColor="indygo" defaultChecked value="nn" onChange={() => {}} />
  </MainTemplate>
);

export default Homepage;
