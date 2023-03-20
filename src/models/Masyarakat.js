const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const MasyarakatSchema = new mongoose.Schema(
  {
    tims: {
      type: ObjectId,
      ref: "Tims",
    },
    nik: {
      type: Number,
      unique: true,
      default: 0,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    tempat_lahir: {
      type: String,
      default: "",
    },
    tanggal_lahir: {
      type: Date,
      default: Date.now,
    },
    umur: {
      type: Number,
      default: 0,
    },
    status_kawin: {
      type: String,
      default: "",
    },
    kelamin: {
      type: String,
      default: "",
    },
    alamat: {
      type: String,
      default: "",
    },
    kecamatan: {
      type: ObjectId,
      ref: "Kecamatan",
    },
  },
  { timestamps: true }
);

const Masyarakat = mongoose.model("Customers", MasyarakatSchema);

module.exports = Masyarakat;
