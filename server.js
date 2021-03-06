const express = require("express");
const DB = require("./config/db");
const app = express();

DB();

app.use(express.json({ extended: false }));

// app.get("/", (req, res) => {
//   res.send("API running hehe");
// });

app.use("/api/adduser", require("./routes/User"));
app.use("/api/getuser", require("./routes/GetUser"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
