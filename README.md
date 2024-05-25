# Group Project
# Table of contents:
* Group Members;
* The Assignment;
* How we managed each task;
* Used technologies;
* Toughts;
* Githbub page link;

  # Group Members

Hi my name is Zahra! I am this Project Manager;
Hi my name is Caroline!
Hi my name is Iliess!

We are the members of the group n 1;

# The Assignment
You have been hired by a "truly disruptive" startup, to create a revolutionnary tool to plan events with friends and relatives. Introducing Didlydoo, the event planner!

A backend developer has already created an API for the tool, so you can focus on the frontend. The list of endpoints is available below.

Your tasks is to :

🌱 Display all the events, including everyone's availability
🌱 Allow users to create events
🌱 Allow users to add their availability to an existing event
🌱 Edit an event name/description/author
🌱 Delete an event
🌱 You must validate your inputs before sending the data to your backend, inputs required must be filed and shorter than 256 characters. If it's not the case you don't send the request and display the appropriate error below the input.
Bonus :

🌼 Display the best possible date for the event according to everyone availabilities
Constrains:

``` No js libraries, or frameworks```

This is the mockup that the company founder has drawn on a piece of paper during a lunch break (you can use it, or create your own layout).

![didlydoo](assets/images/didlydoo.png)

Backend setup
Clone the backend directory on your computer and open in it in a terminal, then type npm install once to install the dependencies.

To launch the server simply type node server/index.mjs to start the server (the terminal has to remain open and running).

![apiSettings](assets/images/api.png)

# How we managed each task

Zahra:
Frontend;
  * Basis structure HTML and CSS (Header and Footer);
  * Dark-Mode;
  * Readme file;

Caroline:
Backend;
* Javascript displayEvent function to retrieve events, from the api, along with:
   the description;
   the date;
   the list of attendees;
   their availability and display all the infos in the respective containers + css;

* Delete event function + css;
* Modify attendees;

Iliess:
Backend;
* Modal addEvent + css;
* patch_event;
* Post_event;
* Post_newDate;
* modifyModal function;

# Toughts 

Zahra:"I really liked the challenge of this assignment; My team are amazingly talented and real-life js masters! 
i found some difficulties to undestand some code parts but they took time to explain to me everything i needed to know with disponibility and care!
i must say that i learned many interesting and fun new things!!!"