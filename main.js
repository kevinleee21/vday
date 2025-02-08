document.addEventListener("DOMContentLoaded", function() {
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const title = document.getElementById("title");
    const first_gif = document.getElementById("strapped");
    const imageContainer = document.getElementById("image-container");
    const duckImage = "images/In Love Hearts GIF.gif"
    const imageYes = "images/costco.gif";  // Image for Yes
    const imageNo = "images/british.gif";  // Image for No
    const numImages = 50; // Number of scattered images

    function getRandomPosition(max) {
        return Math.floor(Math.random() * max) + "px";
    }

    function scatterImages(images) {
        // Clear existing images before scattering new ones
        imageContainer.innerHTML = "";

        for (let i = 0; i < numImages; i++) {
            let img = document.createElement("img");
            img.src = images;
            img.style.position = "absolute";
            img.style.width = "100px"; 
            img.style.height = "auto";
            img.style.top = getRandomPosition(window.innerHeight - 100);
            img.style.left = getRandomPosition(window.innerWidth - 100);
            img.style.zIndex = "10"; 

            imageContainer.appendChild(img);
        }
    }


    scatterImages(duckImage);

    let titles = ["Are you sure?", "Are you really sure?", "Are you really really sure?", "Are you really really really sure?"];
    let clickCounter = 0;

    // Store the original styles
    const computedStyles = window.getComputedStyle(yesButton);
    const originalStyles = {
        width: computedStyles.width,
        height: computedStyles.height,
        position: computedStyles.position,
        top: computedStyles.top,
        left: computedStyles.left,
        padding: computedStyles.padding,
        fontSize: computedStyles.fontSize
    };

    function clickYes() {
        title.innerText = "You get 5 big BOOMS!!!";
        first_gif.src = imageYes;
        scatterImages(imageYes); // Scatter "Yes" images

        // Restore the original button size
        yesButton.style.width = originalStyles.width;
        yesButton.style.height = originalStyles.height;
        yesButton.style.position = originalStyles.position;
        yesButton.style.top = originalStyles.top;
        yesButton.style.left = originalStyles.left;
        yesButton.style.padding = originalStyles.padding;
        yesButton.style.fontSize = originalStyles.fontSize;
    }

    function clickNo() {
        if (clickCounter < titles.length) {
            title.innerText = titles[clickCounter]; // Update title text // Change image
            //  Scatter "No" images
            if (clickCounter == 0) {
                first_gif.src = "images/british.gif";
                scatterImages("images/british.gif");
            } else if (clickCounter == 1) {
                first_gif.src = "images/sad charlie murphy GIF.gif";
                scatterImages("images/sad charlie murphy GIF.gif");
            } else if (clickCounter == 2) {
                first_gif.src = "images/Sad Sponge Bob GIF by SpongeBob SquarePants.gif";
                scatterImages("images/Sad Sponge Bob GIF by SpongeBob SquarePants.gif");
            } else if (clickCounter == 3) {
                scatterImages("images/Sad Season 2 GIF by Friends.gif");
            } else {
                first_gif.src = "images/british.gif";
                scatterImages(imageNo);
            }

            // Scale button gradually (but not too large)
            yesButton.style.fontSize = Math.min(100 + clickCounter * 10, 200) + "px"; // Cap at 200px
            yesButton.style.padding = (50 + clickCounter * 5) + "px " + (50 + clickCounter * 10) + "px"; 
            clickCounter++;
        } 

        if (clickCounter === 4) {
            // Expand button to full screen
            yesButton.style.width = "100vw"; 
            yesButton.style.height = "100vh"; 
            yesButton.style.position = "fixed"; 
            yesButton.style.top = "0"; 
            yesButton.style.left = "0"; 
            yesButton.style.padding = "0"; 
            yesButton.style.fontSize = "5vw"; 
            yesButton.style.zIndex = "9999"; 
        }

        if (clickCounter > 4) {
            title.innerText = "Damn"; // Show final message
        }
    }

    yesButton.addEventListener("click", clickYes);
    noButton.addEventListener("click", clickNo);
});

