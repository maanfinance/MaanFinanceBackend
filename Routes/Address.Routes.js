const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authenticate } = require("../middleware/authentication.middleware");
const { AddressModel } = require("../Model/Address.model");
const AddressRoutes = express.Router();

AddressRoutes.get("/", authMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const product = await AddressModel.find({ userId: payload.userId });
    // console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

AddressRoutes.post("/add", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      Mobile,
      pincode,
      locality,
      address,
      city,
      state,
      landmark,
      alternatephone,
      addresstype,
      userId,
    } = req.body;

    const existingAddress = await AddressModel.findOne({ address });
    if (existingAddress) {
      return res.status(400).json({ message: 'Address already exists' });
    }

    const newAddress = new AddressModel({
      name,
      Mobile,
      pincode,
      locality,
      address,
      city,
      state,
      landmark,
      alternatephone,
      addresstype,
      userId,
    });

    const savedAddress = await newAddress.save();

    res.status(201).json({ address: savedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

AddressRoutes.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await AddressModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  console.log(hotelId);
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await AddressModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

AddressRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const note = await AddressModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await AddressModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted Your Address");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  AddressRoutes,
};
