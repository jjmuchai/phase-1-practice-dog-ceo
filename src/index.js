console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    let allBreeds = []; // Store all breeds for filtering

    // 🔥 Challenge 1: Fetch & Display 4 Random Dog Images
    function fetchDogImages() {
        fetch(imgUrl)
            .then((response) => response.json())
            .then((data) => {
                data.message.forEach((imageUrl) => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = "Dog Image";
                    img.style.width = "200px";
                    img.style.margin = "10px";
                    imageContainer.appendChild(img);
                });
            })
            .catch((error) => console.error("Error fetching dog images:", error));
    }

    // 🔥 Challenge 2: Fetch & Display Dog Breeds
    function fetchDogBreeds() {
        fetch(breedUrl)
            .then((response) => response.json())
            .then((data) => {
                allBreeds = Object.keys(data.message); // Save all breeds
                renderBreeds(allBreeds);
            })
            .catch((error) => console.error("Error fetching breeds:", error));
    }

    // Render breeds dynamically
    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear list before rendering
        breeds.forEach((breed) => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => changeColor(li)); // Challenge 3
            breedList.appendChild(li);
        });
    }

    // 🔥 Challenge 3: Change Font Color on Click
    function changeColor(element) {
        element.style.color = element.style.color === "blue" ? "black" : "blue";
    }

    // 🔥 Challenge 4: Filter Breeds Based on Selected Letter
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter((breed) =>
            breed.startsWith(selectedLetter)
        );
        renderBreeds(filteredBreeds);
    });

    // Execute functions on page load
    fetchDogImages();
    fetchDogBreeds();
});
