document.addEventListener("DOMContentLoaded", function() {
    let currentStory = null; // Store the currently selected story
    let currentPage = 1; // Track the current page of the story being displayed
    let stories = []; // Array to store all available stories

    fetch('../JSON/stories.json')
        .then(response => response.json())
        .then(data => {
            // Store the stories and populate the filters for topics and genres
            stories = data.books;

            // Populate the topic and genre filters
            const topicOptions = document.getElementById('topicOptions');
            const genreOptions = document.getElementById('genreOptions');
            
            // Add topics to the dropdown
            data.topics.forEach(topic => {
                const topicOption = document.createElement('option');
                topicOption.value = topic;
                topicOption.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
                topicOptions.appendChild(topicOption);
            });

            // Add genres to the dropdown
            data.genre.forEach(genre => {
                const genreOption = document.createElement('option');
                genreOption.value = genre;
                genreOption.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
                genreOptions.appendChild(genreOption);
            });

            // Load the first story by default
            currentStory = stories[0];
            loadStoryPage(currentPage);

            // Event listener for navigating to the next page
            document.getElementById('nextButton').addEventListener('click', () => {
                if (currentPage < Object.keys(currentStory.pages).length) {
                    currentPage++;
                    loadStoryPage(currentPage);
                }
            });

            // Event listener for navigating to the previous page
            document.getElementById('backButton').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    loadStoryPage(currentPage);
                }
            });

            // Event listeners for topic and genre filters
            genreOptions.addEventListener('change', function() {
                displayAvailableStories('genre', this.value);
            });

            topicOptions.addEventListener('change', function() {
                displayAvailableStories('topic', this.value);
            });

            // Event listeners for modal actions
            document.getElementById('closeModal').addEventListener('click', closeModal);
            document.getElementById('keepCurrentStory').addEventListener('click', closeModal);
        })
        .catch(error => console.error('Error loading stories.json:', error));

    // Function to load the specified page of the current story
    function loadStoryPage(page) {
        const pageContent = currentStory.pages[`page-${page}`];
        document.getElementById('story-title').textContent = currentStory.title;
        document.getElementById('pageText').textContent = pageContent.content.join(' ');
        document.getElementById('pageImg').src = pageContent.image;
    }

    // Function to display available stories based on the selected filter
    function displayAvailableStories(filterType, filterValue) {
        const availableStoriesList = document.getElementById('availableStoriesList');
        availableStoriesList.innerHTML = ''; // Clear the list before populating

        // Filter stories based on the selected genre or topic
        const filteredStories = stories.filter(story => story[filterType].toLowerCase() === filterValue.toLowerCase());

        // Display each filtered story as a button in the modal
        filteredStories.forEach(story => {
            const storyButton = document.createElement('button');
            storyButton.textContent = story.title;
            storyButton.addEventListener('click', () => {
                currentStory = story;
                currentPage = 1;
                loadStoryPage(currentPage);
                closeModal();
            });
            availableStoriesList.appendChild(storyButton);
        });

        openModal();
    }

    // Function to open the modal
    function openModal() {
        document.getElementById('availableStoriesModal').style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        document.getElementById('availableStoriesModal').style.display = 'none';
    }
});

