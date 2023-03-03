const countryName = document.querySelector("#countryName");
const deleteForm = document.querySelector("#deleteForm");
const securityKey = document.querySelector("#securityKey");
const textAdd = document.querySelector("#text");

/* add country */
deleteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const countryNameInput = countryName.value;

  const data = await fetch(`http://localhost:3000/deleteCountry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: countryNameInput,
      securityKey: securityKey.value,
    }),
  });
  const responseText = await data.text();

  textAdd.innerHTML = responseText;
});
