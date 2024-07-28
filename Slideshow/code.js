// declare an array to store photo file names
const myPhotos = [];

/* populate the array with the photo file names using a for loop
 iterating 26 times (the number of images in the images folder), incrementing by one each time
 I want to eventually accomplish this dynamically by assigning a variable corresponding to the 
 the number of files in the folder by reading that folder, 
 But I am still in the early stages of learning node.js */
for (let i = 0; i < 26; i++) {
    // set the array index to the value of i
    // assign that index position the value of the file name
    myPhotos[i] = `img${i + 1}.jpg`;     // $ returns the value associated with the variable being queried inside the curly brackets. 4
                                         // this functions similarly to f-string formatting in python
}

// create a variable to track the current photo being displayed
var currPhoto = 0; 

// a function to update the img tag in the DOM to the requested photo
const updatePhotoDisplay = (direction) => {
    // call the function which will determine the next photo to display
    chgCurrPhoto(direction);
    // find the img element by its id and change the src to the appropriate file name 
    // of the currPhoto value
    document.getElementById('currentPhoto').src = `images/${myPhotos[currPhoto]}`;
}

// a function to update the currPhoto value based on the user's input
const chgCurrPhoto = (direction) => {
    // switch-case is similar to an if/else statement, but I think it is easier to read and understand in this instance
    switch (direction) {
        // if the user selected the back button, then check if the current photo is the first photo, 
        // if it is, then go to the last photo. if not, go back one photo by subtracting one 
        case "previous":
            if (currPhoto != 0) {
                currPhoto -= 1;
            } else {
                currPhoto = myPhotos.length - 1; 
            }
            break;

        // if the user selected the back button, then check if the current photo is the last photo, 
        // if it is, then go to the first photo. if not, go ahead one photo by adding one 
        case "next":
            if (currPhoto != myPhotos.length - 1) {
                currPhoto += 1;
            } else {
                currPhoto = 0;
            }
            break;
    }
}
