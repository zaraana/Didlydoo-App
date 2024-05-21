export function postEvent(eventName,author,dateTab,description){// Define your API endpoint
    const url = 'http://localhost:3000/api/events';
    
    // Define the data you want to send
    let data = {
        name: eventName, 
        dates: dateTab, 
        author: author, 
        description: description 
    };
    
    // Convert the data to a JSON string
    let body = JSON.stringify(data);
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };
    
    // Make the POST request
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    }