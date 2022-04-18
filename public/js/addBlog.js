async function newFormHandler(event) {
    event.preventDefault();
  
    const blog_title = document.querySelector('#formGroupExampleInput').value;
    const blog_body = document.querySelector('#formGroupExampleInput2').value;
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        blog_title,
        blog_body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      console.error(response.statusText);
    }
  };
  
  document.querySelector('#addProdSubmit').addEventListener('click', newFormHandler);