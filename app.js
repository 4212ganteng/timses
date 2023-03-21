const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./src/routes/index");
const masyarakatrouter = require("./src/routes/masyarakat");
const kecamatanrouter = require("./src/routes/kecamatan");
const timsesrouter = require("./src/routes/timses");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// use cors
app.use(cors());

// router
app.use("/", indexRouter);
app.use("/masyarakat", masyarakatrouter);
app.use("/kecamatan", kecamatanrouter);
app.use("/timses", timsesrouter);

// mongose setup
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error}`));

module.exports = app;
