import React, { useEffect } from 'react';
import sharedStyles from '@/scss/shared/shared.module.scss';
import Navigation from '../Navigation/Navigation';
import { utilExample } from '@/utils/utilExample';

function About() {
  useEffect(() => {
    utilExample();
  }, []);

  return (
    <main className={sharedStyles.mainContainer}>
      <h1>About Page</h1>
      <Navigation />
    </main>
  );
}

export default About;
