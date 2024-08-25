document.addEventListener("DOMContentLoaded", function() {
    let currentPosts = []; // Array to store all posts
    let currentIndex = 0; // Track the current index of the displayed posts
    const postsPerPage = 4; // Number of posts displayed per page
    let filteredPosts = []; // Array to store filtered posts based on user selection

    fetch('../JSON/forum.json')
        .then(response => response.json())
        .then(data => {
            currentPosts = data.posts;
            populateTopics(data.posts); // Populate topics based on the posts' types
            filteredPosts = [...currentPosts]; // Initially, all posts are displayed
            displayPosts();
        })
        .catch(error => console.error('Error loading forum.json:', error));

    // Function to populate the topics dropdown
    function populateTopics(posts) {
        const topicOptions = document.getElementById('topicOptions');
        const uniqueTopics = [...new Set(posts.map(post => post.type))];

        uniqueTopics.forEach(topic => {
            const topicOption = document.createElement('option');
            topicOption.value = topic;
            topicOption.textContent = topic;
            topicOptions.appendChild(topicOption);
        });
    }

    // Function to display the posts based on the current index
    function displayPosts() {
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = "";

        const end = Math.min(currentIndex + postsPerPage, filteredPosts.length);
        for (let i = currentIndex; i < end; i++) {
            const post = filteredPosts[i];

            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const userImg = document.createElement('img');
            userImg.src = post.userImage;
            userImg.alt = post.user;
            userImg.classList.add('user-image');

            const title = document.createElement('h3');
            title.textContent = post.title;
            title.classList.add('post-title');
            title.addEventListener('click', () => showFullPost(post));

            const overview = document.createElement('p');
            overview.classList.add('post-overview');
            overview.textContent = post.overview;

            postDiv.appendChild(userImg);
            postDiv.appendChild(title);
            postDiv.appendChild(overview);
            postContainer.appendChild(postDiv);
        }

        updateNavigationButtons();
    }

    // Function to show the full post with responses
    function showFullPost(post) {
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = "";

        const postDiv = document.createElement('div');
        postDiv.classList.add('full-post');

        const userImg = document.createElement('img');
        userImg.src = post.userImage;
        userImg.alt = post.user;
        userImg.classList.add('user-image');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const text = document.createElement('p');
        text.textContent = post.text;

        const responsesDiv = document.createElement('div');
        responsesDiv.classList.add('responses');

        // Display each response to the post
        post.responses.forEach(response => {
            const responseDiv = document.createElement('div');
            responseDiv.classList.add('response');

            const responseUserImg = document.createElement('img');
            responseUserImg.src = response.userImage;
            responseUserImg.alt = response.user;
            responseUserImg.classList.add('user-image');

            const responseText = document.createElement('p');
            responseText.textContent = response.text;

            responseDiv.appendChild(responseUserImg);
            responseDiv.appendChild(responseText);
            responsesDiv.appendChild(responseDiv);
        });

        postDiv.appendChild(userImg);
        postDiv.appendChild(title);
        postDiv.appendChild(text);
        postDiv.appendChild(responsesDiv);

        postContainer.appendChild(postDiv);

        // Button to go back to the forum list
        const backToForumBtn = document.createElement('button');
        backToForumBtn.textContent = "Back to Forum";
        backToForumBtn.addEventListener('click', displayPosts);
        postContainer.appendChild(backToForumBtn);
    }

    // Event listeners for navigation buttons
    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentIndex + postsPerPage < filteredPosts.length) {
            currentIndex += postsPerPage;
            displayPosts();
        }
    });

    document.getElementById('backButton').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= postsPerPage;
            displayPosts();
        }
    });

    // Event listener for topic filtering
    document.getElementById('topicOptions').addEventListener('change', function() {
        const selectedTopic = this.value;
        currentIndex = 0; // Reset to the first page of results
        filteredPosts = currentPosts.filter(post => post.type === selectedTopic);
        displayPosts();
    });

    // Event listener for sorting by popularity (number of responses)
    document.getElementById('popularButton').addEventListener('click', function() {
        currentIndex = 0;
        filteredPosts = [...currentPosts].sort((a, b) => b.responses.length - a.responses.length);
        displayPosts();
    });

    // Function to update the state of navigation buttons
    function updateNavigationButtons() {
        document.getElementById('backButton').disabled = currentIndex === 0;
        document.getElementById('nextButton').disabled = currentIndex + postsPerPage >= filteredPosts.length;
    }
});
