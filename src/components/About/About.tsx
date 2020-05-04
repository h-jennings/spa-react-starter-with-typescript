import React, { useEffect } from 'react';
import sharedStyles from '../../scss/shared/shared.module.scss';
import Navigation from '../Navigation/Navigation';
import util from '../../utils/utilExample';

function About() {
  useEffect(() => {
    util();
  }, []);

  return (
    <main className={sharedStyles.mainContainer}>
      <h1>About Page</h1>
      <Navigation />
    </main>
  );
}

export default About;
