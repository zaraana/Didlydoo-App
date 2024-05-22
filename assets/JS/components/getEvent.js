export const getEvent = async (eventId) => {
  const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
  const result = await response.json();

  // display the events to the page
  return result;
};
