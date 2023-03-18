const mongoose = require("mongoose");
const KecamatanSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Kecamatan = mongoose.model("Kecamatan", KecamatanSchema);
module.exports = Kecamatan;
