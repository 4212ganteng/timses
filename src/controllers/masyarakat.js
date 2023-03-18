const { default: mongoose } = require("mongoose");
const Masyarakat = require("../models/Masyarakat");
const Tims = require("../models/Tims");

class MasyarakatController {
  create = async (req, res) => {
    try {
      const {
        tims,
        nik,
        nama,
        tempat_lahir,
        tanggal_lahir,
        umur,
        status_kawin,
        kelamin,
        alamat,
      } = req.body;

      const timsId = new mongoose.Types.ObjectId(req.app.locals.credential.id);

      console.log({ timsId });
      const cekNik = await Masyarakat.findOne({ nik });
      if (cekNik) {
        return res.status(401).json({
          status: "fail",
          message: `warga dengan ${nik} sudah terdaftar`,
        });
      }

      const users = await Tims.findOne({ timsId }).populate("kecamatan");

      const warga = await Masyarakat.create({
        ...req.body,
        tims: users._id,
      });

      return res.json({ status: "success", data: { warga, users } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };

  // find by profile name and kecamatan
  findByProfile = async (req, res) => {
    try {
      const timsId = new mongoose.Types.ObjectId(req.app.locals.credential.id);
      console.log({ timsId });
      const users = await Tims.findOne({ timsId });
      if (!users) {
        return res
          .status(404)
          .json({ status: "error", message: "data tidak di temukan" });
      }
      console.log({ users });

      const warga = await Masyarakat.find({ tims: users._id });
      if (!warga.length) {
        return res
          .status(400)
          .json({ status: "error", message: "Data masih kosong" });
      }
      return res.json({ status: "success", data: warga });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };

  // find all warga
  findAll = async (req, res) => {
    try {
      const warga = await Masyarakat.find();
      return res.json({ status: "success", data: warga });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };
}

module.exports = new MasyarakatController();
