const express = require("express");
const router = express.Router();
const otpGenerator = require("otp-generator");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otp.model");
const authMiddleware = require("../middleware/auth.middleware");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const { EmailModel } = require("../Model/Email.Model");

// POST /otp/send
router.post("/send", async (req, res) => {
  const { email, otp } = req.body;
  const expiresAt = moment().add(25, "minutes").toDate();
  const domain1 = email.split("@")[1];
  const domain = await EmailModel.findOne({ email: domain1 });
  const x = domain.discount;

  try {
    if (domain) {
      // Save the OTP code and expiration date to the database
      const data = await OtpModel.find({ email: email });
      console.log(data);
      if (data.length == 0) {
        const otp1 = new OtpModel({
          email,
          otp,
          adminDiscount: x,
          expiresAt,
        });
        await otp1.save();
        res.send({
          message: "Email Register",
        });
      } else {
        const pay = { otp: otp, expiresAt };
        await OtpModel.findByIdAndUpdate({ _id: data[0]._id }, pay);
        res.send({
          message: "Email Update",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid Email Domain",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/verify", async (req, res) => {
  const { email, otpCode } = req.body;
  const domain1 = email.split("@")[1];
  const domain = await EmailModel.findOne({ email: domain1 });
  console.log({ email, otpCode });
  try {
    // Find the OTP code in the database
    const otp = await OtpModel.findOne({
      email: email,
      otp: otpCode,
    });
    if (!otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Delete the OTP code from the database
    // await otp.delete();

    // Generate a JWT token for the user
    const token = jwt.sign(
      { email: otp.email, userId: otp._id, adminDiscount: domain.discount },
      process.env.JWT_SECRET
    );
    res.json({ message: "OTP verified successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const product = await OtpModel.find({ _id: decoded.userId });
    res.send({
      data: product,
      email: req.body.email,
      adminDiscount: req.body.adminDiscount,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const product = await OtpModel.find();
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await OtpModel.findById(req.params.id);
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});
router.put("/otp/:id", async (req, res) => {
  const { id } = req.params;
  const { email, otp, adminDiscount } = req.body;

  try {
    const updatedOtp = await OtpModel.findByIdAndUpdate(
      id,
      { email, otp, adminDiscount },
      { new: true }
    );

    if (!updatedOtp) {
      return res.status(404).json({ message: "OTP not found" });
    }

    res.status(200).json(updatedOtp);
  } catch (error) {
    console.error("Error updating OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/otp/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOtp = await OtpModel.findByIdAndRemove(id);

    if (!deletedOtp) {
      return res.status(404).json({ message: "OTP not found" });
    }

    res.status(200).json({ message: "OTP deleted successfully" });
  } catch (error) {
    console.error("Error deleting OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
