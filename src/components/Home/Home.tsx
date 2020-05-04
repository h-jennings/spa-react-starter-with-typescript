import React from 'react';
import sharedStyles from '../../scss/shared/shared.module.scss';
import styles from './Home.module.scss';
import Navigation from '../Navigation/Navigation';
import reactLogo from '../../images/react.svg';

function Home() {
  return (
    <main className={sharedStyles.mainContainer}>
      <header className={styles.imgContainer}>
        <img alt='React Logo' src={reactLogo} />
      </header>
      <h1>
        SPA React Starter
        <br /> with Typescript
      </h1>
      <Navigation />
    </main>
  );
}

export default Home;
