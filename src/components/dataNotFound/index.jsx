import React from 'react';
import { Link } from 'react-router-dom';

const DataNotFound = ({ customMessage }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <h1>{customMessage} Data Not Found</h1>
            <p>We couldn't find the data you're looking for.</p>
            <Link to="/" style={buttonStyle}>Go to Home</Link>
        </div>
    );
}

// CSS for the button style
const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#4CAF50', // Green color
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px',
};

export default DataNotFound;
