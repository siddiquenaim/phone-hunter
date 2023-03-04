const loadData = async (namePhone, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${namePhone}`;
  const res = await fetch(url);
  const data = await res.json();
  phoneData(data.data, dataLimit);
};

const phoneData = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  if (dataLimit && phones.length > 9) {
    phones = phones.slice(0, 9);
    document.getElementById("show-all").classList.remove("hidden");
  } else {
    document.getElementById("show-all").classList.add("hidden");
  }
  // show 10 phones

  // no phone found message
  if (phones.length === 0) {
    const notFound = document.getElementById("not-found");
    notFound.classList.remove("hidden");
    document.getElementById("loader").classList.add("hidden");
  } else {
    const notFound = document.getElementById("not-found");
    notFound.classList.add("hidden");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("mx-auto");
    phoneDiv.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl my-5">
        <figure>
        <img
            src="${phone.image}"
            alt="Shoes"
        />
        </figure>
        <div class="card-body">
        <h2 class="card-title">Phone Brand: ${phone.brand}</h2>
        <p>Phone Name: ${phone.phone_name}</p>
        <div class="card-actions justify-end">    
           <label for="my-modal" onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</label>
        </div>
        </div>
     </div>
    </div>
    `;

    phoneContainer.appendChild(phoneDiv);
    document.getElementById("loader").classList.add("hidden");
  });
};

const showDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("details-title");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
   <p>Release Date: ${
     phone.releaseDate ? phone.releaseDate : " Phone is yet to be published"
   }</p>
   <p>Brand: ${phone.brand} </p>
   <p>Storage: ${
     phone.mainFeatures
       ? phone.mainFeatures.storage
       : "No storage information found"
   } </p>
   <p>Others: Bluetooth: ${phone.others ? phone.others.Bluetooth : "Not found"}
  `;
};

const processSearch = (dataLimit) => {
  document.getElementById("loader").classList.remove("hidden");
  const searchName = document.getElementById("search-field").value;
  loadData(searchName, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

// search input with enter
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

// not the best way to load show all
document.getElementById("btn-all").addEventListener("click", function () {
  processSearch();
});
