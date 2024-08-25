document.addEventListener("DOMContentLoaded", function() {
    const milestonesContainer = document.getElementById("timeline-container");
    const excerptContent = document.getElementsByClassName("excerpt-content")[0];
    const forwardButton = document.getElementById("forwardButton");
    const backButton = document.getElementById("backButton");

    let currentIndex = 0; // Track the current index of the visible milestones
    const visibleMilestones = 5; // Number of milestones visible at once
    let milestones = []; // Array to store milestones from JSON

    // Fetch milestones from JSON
    fetch('../JSON/milestones.json')
        .then(response => response.json())
        .then(data => {
            milestones = data.Milestones; // Store the milestones data
            populateMilestones(); // Initially populate the milestones
        })
        .catch(error => console.error('Error loading milestones.json:', error));

    // Function to populate the milestones into the container
    function populateMilestones() {
        milestonesContainer.innerHTML = ""; // Clear existing milestones

        // Loop through milestones and display the visible ones
        milestones.forEach((milestone, index) => {
            // check if the milestone falls between the currentIndex and less than that + 5
            if (index >= currentIndex && index < currentIndex + visibleMilestones) {
                const milestoneDiv = document.createElement('div');
                milestoneDiv.classList.add('milestone');
                milestoneDiv.setAttribute('data-excerpt', milestone.description);

                const labelDiv = document.createElement('div');
                labelDiv.classList.add('milestone-label');
                labelDiv.textContent = milestone.age;

                const circleDiv = document.createElement('div');
                circleDiv.classList.add('milestone-circle');

                milestoneDiv.appendChild(labelDiv);
                milestoneDiv.appendChild(circleDiv);
                milestonesContainer.appendChild(milestoneDiv);
            }
        });

        addHoverEffect(); // Reapply hover effects after repopulating
    }

    // Function to add hover effects to milestones
    function addHoverEffect() {
        const milestones = document.getElementsByClassName("milestone");
        if (milestones.length > 0 && excerptContent) {
            for (let i = 0; i < milestones.length; i++) {
                // Show excerpt on hover
                milestones[i].addEventListener("mouseenter", function() {
                    const excerpt = this.getAttribute("data-excerpt");
                    if (excerpt) {
                        excerptContent.getElementsByTagName("p")[0].textContent = excerpt;
                    }
                });

                // Reset excerpt on mouse leave
                milestones[i].addEventListener("mouseleave", function() {
                    excerptContent.getElementsByTagName("p")[0].textContent = "Hover over a milestone to see details here.";
                });
            }
        } else {
            console.error("Milestones or excerpt content not found.");
        }
    }

    // Event listeners for forward and back buttons
    forwardButton.addEventListener("click", function() {
        if (currentIndex + visibleMilestones < milestones.length) {
            currentIndex++;
            populateMilestones(); // Update displayed milestones
        }
    });

    backButton.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
            populateMilestones(); // Update displayed milestones
        }
    });
});

