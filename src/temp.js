const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Your Google Apps Script Web App URL
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
    
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      
      // Log response for debugging
      console.log('Response:', response);
      
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };