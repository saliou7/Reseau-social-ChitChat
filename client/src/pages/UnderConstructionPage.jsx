import React from 'react';

const UnderConstructionPage = () => {
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      height: '92vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      color: 'gray',
      fontWeight: 'bold',
      letterSpacing: '2px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <p>
        This feature is currently under construction.
        <br />
        Please check back later!
      </p>
    </div>
  );
};

export default UnderConstructionPage;
