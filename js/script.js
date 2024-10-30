const loadPhones = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  console.log(phones.length);

  //   display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //   show only first 12 phones
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl p-4 m-4";
    phoneCard.innerHTML = `
     <figure>
              <img
                src="${phone.image}"
              />
            </figure>
            <div class="card-body text-center">
              <h2 class="text-3xl font-semibold">${phone.phone_name}</h2>
              <p class='my-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, libero reprehenderit eveniet quis tenetur veritatis provident, sunt voluptate incidunt excepturi ullam exercitationem ipsum, vel possimus nihil? Alias ipsam hic temporibus.</p>
              <div class="card-actions justify-center">
                <button class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
    // console.log(phone);
  });
  toggleLoading(false);
};

// loadPhones();

const handleSearch = () => {
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
};

const toggleLoading = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadPhones("iphone");
