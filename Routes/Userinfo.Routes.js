const express = require("express");
const UserModel = require("../Model/UserInfo.Model"); // Replace with the correct path to your UserModel file

const userinfoRoutes = express.Router();

// Create a new user

userinfoRoutes.post("/users", (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(user);
    }
  });
});

userinfoRoutes.get("/users/active", (req, res) => {
  UserModel.find({ status: true }, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});
userinfoRoutes.get("/users/inactive", (req, res) => {
  UserModel.find({ status: true }, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

userinfoRoutes.get("/totalInstallment/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findById(req.params.id);

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Find all objects with paid equal to "true" in allInstallments
    const foundInstallments = updatedUser.allInstallments.filter(
      (installment) => installment.paid === "true"
    );

    if (foundInstallments.length === 0) {
      return res
        .status(404)
        .send({ message: "No installments found with paid: true" });
    }

    // Calculate the total amount of installments with paid equal to "true"
    const totalAmount = foundInstallments.reduce(
      (total, installment) => total + installment.amount,
      0
    );

    // If needed, you can do something with the foundInstallments or totalAmount here...

    res.status(200).send({
      data: foundInstallments,
      totalAmount,
      total: foundInstallments.length,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Get all users
userinfoRoutes.get("/users", (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

// Get a specific user by ID
userinfoRoutes.get("/users/:id", (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send(user);
    }
  });
});

userinfoRoutes.get("/user/:id/installments/:date", async (req, res) => {
  try {
    const userId = req.params.id;
    const selectedDate = req.params.date;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const matchingInstallments = user.allInstallments.filter(
      (installment) => installment.date === selectedDate
    );
    const totalAmount = user.allInstallments.reduce((total, installment) => {
      if (installment.paid === "true") {
        return total + installment.amount;
      }
      return total;
    }, 0);

    // console.log("Total Amount Paid:", totalAmount);

    // Calculate the total paid amount from the matching installments
     matchingInstallments[0].amount;
        user.customerAmountpaid=totalAmount
        // //console.log(amount1)
        //  console.log(val)
        
  
    await user.save(); // Save the updated user

    res.json(matchingInstallments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a user by ID
userinfoRoutes.put("/users/:id", (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send(user);
      }
    }
  );
});

userinfoRoutes.put("/users/:id", (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send(user);
      }
    }
  );
});

userinfoRoutes.patch("/installment/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findById(req.params.id);

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const { _id, paid, date, amount } = req.body;

    // Find the index of the target object within the allInstallments array
    const installmentIndex = updatedUser.allInstallments.findIndex(
      (installment) => installment._id.toString() === _id
    );

    // If the target object is found, update its properties
    if (installmentIndex !== -1) {
      updatedUser.allInstallments[installmentIndex].paid = paid;
      updatedUser.allInstallments[installmentIndex].date = date;
      updatedUser.allInstallments[installmentIndex].amount = amount;

      // Other calculations if needed, like updating payment totals

      await updatedUser.save(); // Save the updated user data
      res.status(200).send(updatedUser);
    } else {
      return res.status(404).send({ message: "Installment not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a user by ID
userinfoRoutes.delete("/users/:userId", (req, res) => {
  UserModel.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ message: "User deleted successfully" });
    }
  });
});


userinfoRoutes.get("/calculateTotalPaidAmount/:date", async (req, res) => {
  try {
    const requestedDate = req.params.date;

    const result = await UserModel.aggregate([
      {
        $unwind: "$allInstallments",
      },
      {
        $match: {
          "allInstallments.date": requestedDate,
          "allInstallments.paid": "true",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$allInstallments.amount" },
        },
      },
    ]);
  

    if (result.length > 0) {
      res.json({ totalPaidAmount: result[0].totalAmount });
    } else {
      res.json({ totalPaidAmount: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { userinfoRoutes };
