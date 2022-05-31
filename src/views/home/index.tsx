import React from 'react';
import styles from './index.module.css';

function Home() {

  const handleDonwload = () => {

  };

  return (
    <div className={styles.content}>
      <h1>Example Download de Gigabytes with Electron</h1>
        <button onClick={() => handleDonwload}>
          Download
        </button>
    </div>
  );
}

export default Home;
