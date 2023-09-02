const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authenticate } = require("../middleware/authentication.middleware");
const { AddressModel } = require("../Model/Address.model");
const { ProductModel } = require("../Model/Product.Model");
const { VendorModel } = require("../Model/vendor.model");
const OrderRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { OrderModel } = require("../Model/Order.Model");

OrderRoutes.get("/", authMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const product = await OrderModel.find({ userId: payload.userId });
    //   console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

OrderRoutes.get("/totalorder", async (req, res) => {
  try {
    const data = await OrderModel.find();
    res.send({ data, total: data.length });
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.get("/vendororder", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);

  try {
    const data = await OrderModel.find();
    const totaldata = [];
    for (let i = 0; i < data.length; i++) {
      const arr = [];
      for (let j = 0; j < data[i].products.length; j++) {
        if (data[i].products[j].vendorId == decoded.vendorId) {
          arr.push({
            products: data[i].products[j],
            orderId: data[i]._id,
            AddressId: data[i].addressId,
            shippingAddress: data[i].shippingAddress,
            username: data[i].username,
            userId: data[i].userId,
            createdAt: data[i].createdAt,
          });
        }
      }
      if (arr.length > 0) {
        totaldata.push(arr);
      }
    }
    res.send({ data: totaldata, total: totaldata.length });
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders" });
  }
});

OrderRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await OrderModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.post("/add", authMiddleware, async (req, res) => {
  let data = req.body;
  try {
    let data1 = new OrderModel(data);
    await data1.save();

    res.send({ msg: "Data Added" });
  } catch (err) {
    res.send(err);
  }
});

OrderRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
  const user = req.body.userId;
  const Id = req.params.id;
  const payload = req.body;

  const data = await OrderModel.findOne({ _id: Id });
  const data1 = data.userId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);
  try {
    if (a !== b) {
    } else {
      await OrderModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

OrderRoutes.patch("/cancel/:orderId",authMiddleware, async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId);
    const x = order.products.find((el) => el._id.toString() === req.body.Id);
    
    if (x) {
      x.status = "Cancelled";
      const y = await order.save();
      console.log(y);
    } else {
      console.log("Product not found in order");
    }
    
    // Rest of your code...

    // if (!order) {
    //   return res.status(404).json({ message: "Order not found" });
    // }

    // if (order.orderStatus === "Cancelled") {
    //   return res.status(400).json({ message: "Order is already cancelled" });
    // }

    // order.orderStatus = "Cancelled";
    // await order.save();

    // return res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


OrderRoutes.patch("/changestatus/:id", async (req, res) => {
  try {
    const data = await OrderModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

OrderRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const user = req.body.userId;
  const Id = req.params.id;
  const payload = req.body;

  const data = await OrderModel.findOne({ _id: Id });
  const data1 = data.userId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);
  try {
    if (a !== b) {
    } else {
      await OrderModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});
// Update an existing order
OrderRoutes.put("/orders/:id", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
});

// Delete an order
OrderRoutes.delete("/orders/:id", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = {
  OrderRoutes,
};
