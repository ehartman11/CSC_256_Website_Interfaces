document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data for the home page after loading
    fetch('../JSON/home.json')
        .then(response => response.json())
        .then(data => {
            // Update the welcome statement and description with data from the JSON file
            document.getElementById('welcome-statement').textContent = data.welcomeStatement;
            document.getElementById('description').textContent = data.shortDescription;

            // Populate the testimonials section
            const testimonialContainer = document.getElementById('testimonials');
            data.testimonials.forEach(testimonial => {
                // Create a div for each testimonial
                const testimonialDiv = document.createElement('div');
                testimonialDiv.classList.add('testimonial');

                // Add the quote text
                const quote = document.createElement('p');
                quote.textContent = `"${testimonial.quote}"`;

                // Add the author of the quote
                const author = document.createElement('p');
                author.textContent = `- ${testimonial.author}`;
                author.classList.add('testimonial-author');

                // Append the quote and author to the testimonial div
                testimonialDiv.appendChild(quote);
                testimonialDiv.appendChild(author);
                // Add the testimonial div to the container
                testimonialContainer.appendChild(testimonialDiv);
            });
        })
        .catch(error => console.error('Error loading home.json: ', error));
});
