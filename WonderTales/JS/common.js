header = document.getElementById('banner');
footer = document.getElementById('footer');

const navPages = {
    "Stories": "storyPage.html",
    "Milestones": "Milestones.html",
    "Resources": "parentalResources.html",
    "Discussion Forum": "discussionForum.html",
};

// Create Home link styled as a button
const homeNav = document.createElement('a');
homeNav.href = "home.html";
homeNav.textContent = "Home";
homeNav.classList.add('button-style'); 

// Create dropdown menu
const dropMenuDiv = document.createElement('div');
dropMenuDiv.classList.add('dropdown');

const dropBtn = document.createElement('button');
dropBtn.classList.add('dropbtn');
dropBtn.textContent = 'Menu';

const dropMenuContent = document.createElement('div');
dropMenuContent.classList.add('dropdown-content');

for (let key in navPages) {
    const nav = document.createElement('a');
    nav.href = navPages[key];
    nav.textContent = key;
    dropMenuContent.appendChild(nav);
}

dropMenuDiv.appendChild(dropBtn); 
dropMenuDiv.appendChild(dropMenuContent); 

// Create Account link styled as a button
const accountNav = document.createElement('a');
accountNav.href = "userAccount.html";
accountNav.textContent = "Account";
accountNav.classList.add('button-style'); 

// Append elements to header
header.appendChild(homeNav);
header.appendChild(dropMenuDiv);
header.appendChild(accountNav);

// Create About Us link styled as a button in footer
const aboutUsNav = document.createElement('a');
aboutUsNav.href = "aboutUs.html";
aboutUsNav.textContent = "About Us";
aboutUsNav.classList.add('button-style'); 

// Footer label
const footerLabel = document.createElement('p');
footerLabel.textContent = 'WonderTales';

// Create Contact Us link styled as a button in footer
const contactUsNav = document.createElement('a');
contactUsNav.href = "mailto:ephartman1@gmail.com";
contactUsNav.textContent = "Contact Us";
contactUsNav.classList.add('button-style'); 

// Append elements to footer
footer.appendChild(aboutUsNav);
footer.appendChild(footerLabel);
footer.appendChild(contactUsNav);
