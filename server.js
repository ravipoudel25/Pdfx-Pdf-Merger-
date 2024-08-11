const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const { merger } = require("./merger");

const upload = multer({ dest: "uploads/" });

const port = 3000;
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  // console.log(req.files);
  let d = await merger(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  // res.send({ data: req.files });
  res.redirect(`http://localhost:3000/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`);
});
