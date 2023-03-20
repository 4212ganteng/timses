const Tims = require("../models/Tims");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
class TimsesController {
  // CREATE OR REGISTER TIMES
  register = async (req, res) => {
    try {
      const { nama, desa, wa, kecamatan, password, email, role } = req.body;

      const kecId = new mongoose.Types.ObjectId(req.body.kecamatan);

      if (!password) {
        return res
          .status(401)
          .json({ status: "failed", message: "Password is required" });
      }
      if (!email) {
        return res
          .status(401)
          .json({ status: "failed", message: "Email is required" });
      }

      const cekemail = await Tims.findOne({ email });
      if (cekemail !== null) {
        return res
          .status(401)
          .json({ status: "failed", message: "Email already exists" });
      }

      // bcrypt
      const salt = await bcrypt.genSalt();
      const passHash = await bcrypt.hash(password, salt);

      const timses = await Tims.create({
        nama,
        desa,
        wa,
        kecamatan: kecId,
        password: passHash,
        email,
        role,
      });

      return res.json({ status: "success", message: timses });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };

  // LOGIN TIMES
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const cekmail = await Tims.findOne({ email });

      if (!cekmail) {
        return res.status(404).json({
          name: "LoginEmailNotFound",
          success: false,
          message: "Email not found",
        });
      }
      // compare password
      const compare = await bcrypt.compare(password, cekmail.password);

      if (!compare) {
        return res
          .status(400)
          .json(Response.errorResponse("Email or Password Wrong!."));
      }

      // create token
      const token = jwt.sign({ cekmail }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ status: "success", data: { token, cekmail } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  };

  // cekauth

  cekAuth = async (req, res) => {
    try {
      // Get id from token
      const id = req.app.locals.credential;
      const dataUser = await Tims.findOne({
        where: {
          _id: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      }).populate("kecamatan");

      if (!dataUser) {
        return res.status(404).send({
          status: "failed",
        });
      }

      res.send({
        status: "success...",
        data: {
          user: {
            id: dataUser._id,
            nama: dataUser.nama,
            email: dataUser.email,
            wa: dataUser.wa,
            desa: dataUser.desa,
            role: dataUser.role,
            kecamatan: dataUser.kecamatan.nama,
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status({
        status: "failed",
        message: "Server Error",
      });
    }
  };
}

module.exports = new TimsesController();
