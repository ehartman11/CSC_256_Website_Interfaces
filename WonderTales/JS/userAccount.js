document.addEventListener("DOMContentLoaded", function() {
    const parentNameText = document.getElementById('parentNameText');
    const childNameText = document.getElementById('childNameText');
    const userAvatar = document.getElementById('userAvatar');
    const userProfile = document.getElementById('userImg');
    const userForm = document.getElementById('userForm');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    fetch('../JSON/userAccount.json')
        .then(response => response.json())
        .then(data => {
            // Populate user avatar and profile images
            userAvatar.src = data.avatar;
            userProfile.src = data.profile;

            // Populate parent and child names
            parentNameText.textContent = data["parent name"];
            childNameText.textContent = data["child name"];

            // Populate the child's age group, upcoming milestones, and hobbies
            document.getElementById('ageGroup').textContent = `Age: ${calculateAgeGroup(data["child birthday"])}`;
            document.getElementById('upcomingMilestones').textContent = `Upcoming Milestones: ${data["upcoming milestones"]}`;
            document.getElementById('currentPreferences').textContent = `Current Preferences: ${data.hobbies}, Favorite Stories: ${data["favorite stories"]}`;

            // Populate awards and badges
            populateList(data.Awards, 'awardsList');
            populateList(data.badges, 'badgesList');
        })
        .catch(error => console.error('Error loading userAccount.json:', error));

    // Function to populate awards and badges via html list elements 
    function populateList(items, elementId) {
        const list = document.getElementById(elementId);
        list.innerHTML = ""; 
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
    }

    // Function to calculate the age group based on the child's birthday
    function calculateAgeGroup(birthday) {
        const birthDate = new Date(birthday);
        // Use the child's birth day and current day to convert age to months
        const ageInMonths = (new Date().getFullYear() - birthDate.getFullYear()) * 12 + (new Date().getMonth() - birthDate.getMonth());

        // return a string indicating the age group the child falls within
        if (ageInMonths <= 12) {
            return "0-1 years";
        } else if (ageInMonths <= 24) {
            return "1-2 years";
        } else if (ageInMonths <= 36) {
            return "2-3 years";
        } else if (ageInMonths <= 48) {
            return "3-4 years";
        } else if (ageInMonths <= 60) {
            return "4-5 years";
        } else if (ageInMonths <= 72) {
            return "5-6 years";
        } else if (ageInMonths <= 84) {
            return "6-7 years";
        } else if (ageInMonths <= 96) {
            return "7-8 years";
        } else if (ageInMonths <= 108) {
            return "8-9 years";
        } else if (ageInMonths <= 120) {
            return "9-10 years";
        } else {
            return "10+ years";
        }
    }

    // Show the form when Edit Profile is clicked
    editProfileBtn.addEventListener('click', function() {
        userForm.style.display = 'block';
    });

    // Hide the form when Cancel is clicked
    cancelBtn.addEventListener('click', function() {
        userForm.style.display = 'none';
    });

    // Handle form submission to update the displayed names of the child and parent
    userForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const parentName = document.getElementById('parentName').value;
        const childName = document.getElementById('childName').value;

        parentNameText.textContent = parentName;
        childNameText.textContent = childName;

        // Hide the form after saving
        userForm.style.display = 'none';
    });
});
