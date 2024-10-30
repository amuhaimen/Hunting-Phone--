const loadPhones = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  //   console.log(phones.length);

  //   display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  //   show only first 12 phones if not show all

  //   console.log("show all clicked", isShowAll);

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);

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
                <button onclick="handleShowDetails('${phone.slug}');phone_details_modal.showModal()" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
    // console.log(phone);
  });
  toggleLoading(false);
};

// loadPhones();

const handleSearch = (isShowAll) => {
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);
};

const toggleLoading = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// handle showDetails
const handleShowDetails = async (id) => {
  //   console.log("click to see phone details", id);
  // show single phone details
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  displayPhoneDetails(phone);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalCardContainer = document.getElementById("modal-card-container");
  modalCardContainer.innerHTML = `
    <div class="card bg-base-100 m-4 shadow-xl">
        <figure>
            <img src="${phone.image}"/>
        </figure>
        <div class="card-body">
            <h2 class="card-title text-3xl">${phone.name}</h2>
            <p><small>${phone.releaseDate}</small></p>
            <p><b>Storage:</b>${phone.mainFeatures.storage}</p>
            <p><b>Display Size:</b>${phone.mainFeatures.displaySize}</p>
            <p><b>Chipset:</b>${phone.mainFeatures.chipSet}</p>
            <p><b>Memory:</b>${phone.mainFeatures.memory}</p>
            <p><b>Brand:</b>${phone.brand}</p>
            <p><b>GPS:</b>${phone.others.GPS}</p>
        </div>
    </div>
  `;
};

loadPhones();
