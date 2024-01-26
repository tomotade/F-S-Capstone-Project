const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let laps = [];
// Controller imports and routes go here
app.get("/api/laps", (req, res) => {
  res.status(200).send(laps);
});

app.post("/api/laps/:name", (req, res) => {
  let { lapsArr } = req.body;
  let { name } = req.params;
  let newObject = {
    name,
    lapsArr,
  };
  laps.push(newObject);
  console.log(laps);

  res.status(200).send("information save sucessfully");
});

app.listen(4000, () => console.log("Server running on 4000"));
