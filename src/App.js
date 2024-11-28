import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Replace with YOUR actual Google Apps Script Web App URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjFdszOhsySeagg9Q6xA72Sq4SBtbqT8bkXJ_g0y0LVl6QEEu1DhJpMjmeNhWlXPdc-g/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Try multiple content types and body formats
      const fetchOptions = [
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email })
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${encodeURIComponent(email)}`
        }
      ];

      let result;
      for (let options of fetchOptions) {
        try {
          const response = await fetch(SCRIPT_URL, options);
          result = await response.json();
          
          // Log full server response for debugging
          console.log('Server response:', result);

          if (result.status === 'success') {
            setSubmitted(true);
            setEmail('');
            return;
          }
        } catch (fetchError) {
          console.error('Fetch attempt failed:', fetchError);
        }
      }

      // If we get here, all fetch attempts failed
      setError(result?.message || 'Something went wrong');

    } catch (error) {
      console.error('Final error:', error);
      setError('Network error. Please try again.');
    }
  };

  // Render remains the same as in previous examples
  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>
          Join Our Waitlist
        </h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
            {error && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div style={{ color: '#4CAF50' }}>
            Thank you for joining our waitlist!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;