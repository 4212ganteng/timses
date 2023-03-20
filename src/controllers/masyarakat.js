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
        kecamtan,
      } = req.body;
      const kecId = new mongoose.Types.ObjectId(req.body.kecamatan);
      const timsId = req.app.locals.credential.cekmail._id;

      console.log({ timsId });
      const cekNik = await Masyarakat.findOne({ nik });
      if (cekNik) {
        return res.status(401).json({
          status: "fail",
          message: `warga dengan ${nik} sudah terdaftar`,
        });
      }

      const users = await Tims.findById(timsId).populate("kecamatan");

      const warga = await Masyarakat.create({
        ...req.body,
        tims: users._id,
        kecamtan: kecId,
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
      const timsId = req.app.locals.credential.cekmail._id;
      console.log({ timsId });
      const users = await Tims.findById(timsId);
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

  // update warga

  update = async (req, res) => {
    try {
      const {
        nik,
        nama,
        tempat_lahir,
        tanggal_lahir,
        umur,
        status_kawin,
        kelamin,
        alamat,
      } = req.body;

      const id = req.params.id;

      const timsId = req.app.locals.credential.cekmail._id;
      console.log({ timsId });

      const tims = await Tims.findById(timsId);

      if (!tims) {
        return res
          .status(404)
          .json({ status: "error", message: "Data tidak ditemukan" });
      }

      console.log("timsid", tims._id);
      const cekNik = await Masyarakat.findOne({ nik });
      if (cekNik) {
        // Menambahkan validasi jika nik yang dimasukkan sudah ada
        return res.status(401).json({
          status: "fail",
          message: `warga dengan ${nik} sudah terdaftar`,
        });
      }
      const warga = await Masyarakat.findOne({ tims: tims._id, _id: id });
      console.log({ warga });
      if (!warga) {
        // Mengubah kondisi if untuk pengecekan apakah warga ditemukan
        return res
          .status(400)
          .json({ status: "error", message: "Data masih kosong" });
      }

      const updateWarga = await Masyarakat.findByIdAndUpdate(
        id,
        req.body,
        { new: true } // Menggunakan method findByIdAndUpdate untuk mengupdate data warga
      );

      return res.json({ status: "success", data: updateWarga });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };

  // delete warga
  delete = async (req, res) => {
    try {
      const timsId = req.app.locals.credential.cekmail._id;

      const tims = await Tims.findById(timsId);

      if (!tims) {
        return res
          .status(404)
          .json({ status: "error", message: "Data tidak ditemukan" });
      }

      const warga = await Masyarakat.find({ tims: tims._id });

      if (!warga.length) {
        return res
          .status(400)
          .json({ status: "error", message: "Data masih kosong" });
      }

      const deletedWarga = await Masyarakat.findByIdAndDelete(req.params.id);

      if (!deletedWarga) {
        return res
          .status(404)
          .json({ status: "error", message: "Data tidak ditemukan" });
      }

      return res.json({ status: "success", message: "Data berhasil dihapus" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };
}

module.exports = new MasyarakatController();
