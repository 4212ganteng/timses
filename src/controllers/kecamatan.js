const Kecamatan = require("../models/Kecamatan");

class KecamatanController {
  create = async (req, res) => {
    try {
      const { nama } = req.body;
      const kecamatan = await Kecamatan.create({ nama: nama });
      return res.json({ status: "success", Data: kecamatan });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };
}

module.exports = new KecamatanController();
