document.addEventListener("DOMContentLoaded", function() {
    fetch('../JSON/resources.json')
        .then(response => response.json())
        .then(data => {

            // Populate Featured Article
            var featuredTitle = document.getElementsByTagName('h2')[0];
            var featuredDescription = document.getElementsByTagName('p')[0];
            var authorImage = document.getElementsByClassName('author-image')[0];

            // Create a new element for the title
            var featuredLink = document.createElement('a');
            featuredLink.href = data.featuredArticle.link;
            featuredLink.textContent = "Featured Article: " + data.featuredArticle.title;
            featuredLink.classList.add('article-link'); 

            // Replace the content of the h2 
            featuredTitle.innerHTML = ''; 
            featuredTitle.appendChild(featuredLink); 

            // Populate the description and author image
            featuredDescription.textContent = data.featuredArticle.description;
            authorImage.src = data.featuredArticle.authorImage;

            // Populate Books
            var booksContainer = document.getElementsByClassName('resource-category')[0].getElementsByClassName('resource-items')[0];
            data.books.forEach(function(book) {
                var bookDiv = document.createElement('div');
                bookDiv.classList.add('resource-item');
                
                var bookLink = document.createElement('a');
                bookLink.href = book.link;
                bookLink.textContent = book.title;
                bookLink.target = "_blank"; 

                bookDiv.appendChild(bookLink);
                booksContainer.appendChild(bookDiv);
            });

            // Populate Articles
            var articlesContainer = document.getElementsByClassName('resource-category')[1].getElementsByClassName('resource-items')[0];
            data.articles.forEach(function(article) {
                var articleDiv = document.createElement('div');
                articleDiv.classList.add('resource-item');
                
                var articleLink = document.createElement('a');
                articleLink.href = article.link;
                articleLink.textContent = article.title;
                articleLink.target = "_blank"; 

                articleDiv.appendChild(articleLink);
                articlesContainer.appendChild(articleDiv);
            });

            // Populate Videos
            var videosContainer = document.getElementsByClassName('resource-category')[2].getElementsByClassName('resource-items')[0];
            data.videos.forEach(function(video) {
                var videoDiv = document.createElement('div');
                videoDiv.classList.add('resource-item');
                
                var videoLink = document.createElement('a');
                videoLink.href = video.link;
                videoLink.textContent = video.title;
                videoLink.target = "_blank"; 

                videoDiv.appendChild(videoLink);
                videosContainer.appendChild(videoDiv);
            });

            // Populate Blogs/News
            var blogsContainer = document.getElementsByClassName('resource-category')[3].getElementsByClassName('resource-items')[0];
            data.blogs.forEach(function(blog) {
                var blogDiv = document.createElement('div');
                blogDiv.classList.add('resource-item');
                
                var blogLink = document.createElement('a');
                blogLink.href = blog.link;
                blogLink.textContent = blog.title;
                blogLink.target = "_blank"; 

                blogDiv.appendChild(blogLink);
                blogsContainer.appendChild(blogDiv);
            });

        })
        .catch(function(error) {
            console.error('Error loading resources.json: ', error);
        });
});
