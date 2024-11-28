const handleSubmit = async (e) => {
    e.preventDefault();
    
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
    
    try {
      const response = await fetch(scriptURL + '?email=' + encodeURIComponent(email), {
        method: 'GET',
      });
      
      console.log('Response:', response);
      
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };