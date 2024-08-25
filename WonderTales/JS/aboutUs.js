document.addEventListener("DOMContentLoaded", function() {
    fetch('../JSON/aboutUs.json')
        .then(response => response.json())
        .then(data => {
            // Update mission, vision, and story sections with data from the JSON file
            document.getElementById('mission').textContent = data.mission;
            document.getElementById('vision').textContent = data.vision;
            document.getElementById('ourStory').textContent = data.ourStory;

            // Populate the team members section
            const teamContainer = document.getElementById('team-section');
            data.teamMembers.forEach(member => {
                // Create a div for each team member
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('team-member');

                // Add team member's image
                const img = document.createElement('img');
                img.src = member.image;
                img.alt = member.name;

                // Add team member's name
                const name = document.createElement('h3');
                name.textContent = member.name;

                // Add team member's role
                const role = document.createElement('p');
                role.textContent = member.role;

                // Add team member's bio
                const bio = document.createElement('p');
                bio.textContent = member.bio;

                // Append all elements to the team member div
                memberDiv.appendChild(img);
                memberDiv.appendChild(name);
                memberDiv.appendChild(role);
                memberDiv.appendChild(bio);
                
                // Add the team member div to the team container
                teamContainer.appendChild(memberDiv);
            });
        })
        .catch(error => console.error('Error loading aboutUs.json: ', error));
});
