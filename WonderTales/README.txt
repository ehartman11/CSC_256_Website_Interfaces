WonderTales
Welcome to WonderTales, this is a web application crafted to foster the emotional, physical, and intellectual development of children. 
Through engaging stories and activities, the aim is to spark curiosity and promote learning in a fun and meaningful way between parents and their children.

This is my final project for CSC256 Designing Website Interfaces I. 
This application was written to be run from a local server in order to access (fetch) the JSON files within the directory, 
so make sure to follow the instructions below to install and run Node.js. 
Additionally, after any modifications to the files, reload the affected page(s) by using Ctrl+F5 to clear the browser’s cache, 
or the elements may not update as desired. 

The application itself is not fully fledged for use, but rather a demonstration of the techniques and use of HTML, JS, JSON, and CSS in a fun and creative way. 
For the purposes of grading and understandability, but also because many of the pages share the same techniques, 
I will be providing comments within the codebase of Home.HTML/JS/CSS for templated items. 
Other unique structures and functions throughout will have their own commenting. 

As an aside, I wanted to note that much of the filler content found in the JSON files was provided by ChatGPT. 
Specifically, the story texts and images, the excerpts, and the profile images in the discussion forum section. 
This was to prevent the accidental use of proprietary or licensed content.

Prerequisites
Before diving in, make sure you have Node.js installed. It’s essential for running the application locally.

Installation
1. Clone the Repository
Open your terminal (Command Prompt, PowerShell, or Terminal) and navigate to your desired directory. Then run:
-	git clone https://github.com/yourusername/wondertales.git
 -      cd wondertales

2. Install Dependencies
In your terminal, run:
  -     npm install

3. Run the Project
Using Node.js and npm (Preferred Method)
To start the application, run:
-	npm start
Then, open your web browser and go to http://localhost:3000.

Using http-server (Alternative)
If you prefer a simpler setup, you can use http-server:
1.	Install http-server globally (if you haven’t already):
-	npm install -g http-server
2.	Start the server:
-	http-server .
3.	Visit http://localhost:8080 in your web browser to view the project.

                                  
Project Structure and Operability
The project is organized with a clear, modular structure to keep things clean, maintainable, and scalable. 
Here’s a quick overview of how everything fits together:
                                  
1. HTML Files
•	Each webpage is an HTML file that lays out the basic structure and elements of the page. 
  These files link to their corresponding JS, and CSS files to load dynamic content and style the page.
                                  
2. JavaScript (JS) Files
•	Each webpage pairs with a JS file responsible for the dynamic aspects. 
  These files fetch data from JSON files and populate the webpage with the necessary content when it loads by building HTML elements, 
  filling them with appropriate tags, ids, classes, and text, links and functions, and, finally appending them to the page itself. 
  Some of the extra functionality includes selecting stories, scrolling through timelines, and filtering available content, etc.
                                  
3. JSON Files
•	These are designed to store data that dynamically updates the content displayed on the page. 
  This includes everything from user info to resource lists and story content.
                                  
4. CSS Files
•	These handle the styling of the webpages. Each page has an associated CSS file that controls the visual presentation.
                                  
5. Common Files
•	There is a common JS and CSS file referenced across multiple pages to keep things consistent and reduce redundancy. 
These handle loading and styling the header and footer for each page.
                                  
How It All Works Together
•	JSON to JS to HTML: When you load a webpage, its associated JS file fetches data from the relevant JSON file. 
  The JS then dynamically updates the HTML with this data.
•	CSS: The CSS files ensure that each page looks as it should, styling both dynamically generated content and the static elements defined in the HTML.
