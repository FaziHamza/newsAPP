import React from 'react';

const DataNotFound = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <h1>Data Not Found</h1>
            <p>We couldn't find the data you're looking for.</p>
        </div>
    );
}

export default DataNotFound;
