const countryName = document.querySelector("#countryName");
const capitalName = document.querySelector("#capitalName");
const languageName = document.querySelector("#languageName");
const population = document.querySelector("#population");
const addCountryButton = document.querySelector("#addCountryButton");
const addForm = document.querySelector("#addForm");
const securityKey = document.querySelector("#securityKey");
const textAdd = document.querySelector("#text");

/* add country */
addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const countryNameInput = countryName.value;
  const capitalNameInput = capitalName.value;
  const languageNameInput = languageName.value;
  const populationInput = population.value;
  console.log(
    "🚀 ~ file: add.js:17 ~ addForm.addEventListener ~ populationInput:",
    typeof populationInput
  );
  const securityKeyInput = securityKey.value;

  const data = await fetch(`http://localhost:3000/addCountry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: countryNameInput,
      capital: capitalNameInput,
      language: languageNameInput,
      population: populationInput,
      securityKey: securityKeyInput,
    }),
  });

  const responseText = await data.text();

  textAdd.innerHTML = responseText;
});
