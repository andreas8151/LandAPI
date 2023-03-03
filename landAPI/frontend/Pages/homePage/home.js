const addBtn = document.querySelector("#addBtn");
const updateBtn = document.querySelector("#updateBtn");
const form = document.querySelector("form");
const textAdd = document.querySelector("#textAdd");
const countryInputValue = document.querySelector("#getCountryInputValue");
const deleteBtn = document.querySelector("#deleteBtn");

addBtn.addEventListener("click", () => {
  window.location.href = "../addPage/add.html";
});

updateBtn.addEventListener("click", () => {
  window.location.href = "../updatePage/update.html";
});

deleteBtn.addEventListener("click", () => {
  window.location.href = "../DeletePage/delete.html";
});

/*  Get country */
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const country = countryInputValue.value;

  const data = await fetch(`http://localhost:3000/getCountry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: country }),
  });

  const res = await data.json();
  const textResponse = JSON.stringify(res[0]);

  if (data.ok) {
    textAdd.innerHTML = textResponse;
  } else {
    textAdd.innerHTML = res.error;
  }
});
