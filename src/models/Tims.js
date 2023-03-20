const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const TimsSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    desa: {
      type: String,
      required: true,
      default: "",
    },
    wa: {
      type: String,

      default: "",
    },
    role: {
      type: String,

      default: "timses",
    },
    kecamatan: {
      type: ObjectId,
      ref: "Kecamatan",
    },
  },
  { timestamps: true }
);

const Tims = mongoose.model("Tims", TimsSchema);
module.exports = Tims;
