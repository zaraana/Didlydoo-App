export function postEvent() {
  // Define your API endpoint
  const url = "http://localhost:3000/api/events";

  // Define the data you want to send
  let data = {
    name: "Event Name", // optional, replace with your event's name
    dates: ["2024-05-21", "2024-05-22"], // array of date strings in the format "yyyy-mm-dd"
    author: "Author Name", // optional, replace with the author's name
    description: "Description of the event", // optional, replace with your event's description
  };

  // Convert the data to a JSON string
  let body = JSON.stringify(data);

  // Define the options for the fetch function
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };

  // Make the POST request
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}
