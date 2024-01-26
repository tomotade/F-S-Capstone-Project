let displaySection = document.querySelector("#display");

function getData() {
  axios
    .get("http://localhost:4000/api/laps")
    .then((res) => {
      console.log(res.data);
      renderTable(res.data);
    })
    .catch((err) => console.log(err));
}
getData();

function renderTable(arr) {
  displaySection.innerHTML = "";
  arr.forEach((element) => {
    let timeDiv = document.createElement("div");
    timeDiv.innerHTML = `
        <h4>${element.name}</h4>
        `;
    element.lapsArr.forEach((e) => {
      let lapTime = document.createElement("div");
      lapTime.innerHTML = `
        <p>Lap Number:${e.lapNumber}</p>
        <p>Time:${e.time}</p>
        `;
      timeDiv.appendChild(lapTime);
    });
    displaySection.appendChild(timeDiv);
    console.log(element.lapsArr);
  });
}
