const express = require("express");
const PolicyRouter = express.Router();
const PolicyModel = require("../Model/Policy.Model");

// Create a new policy
PolicyRouter.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const policy = await PolicyModel.create({ description });
    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the policy." });
  }
});

// Update a policy
PolicyRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedPolicy = await PolicyModel.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    res.status(200).json(updatedPolicy);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the policy." });
  }
});

// Retrieve all policies
PolicyRouter.get("/", async (req, res) => {
  try {
    const policies = await PolicyModel.find();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the policies." });
  }
});

// Retrieve a specific policy
PolicyRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await PolicyModel.findById(id);
    if (policy) {
      res.status(200).json(policy);
    } else {
      res.status(404).json({ error: "Policy not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the policy." });
  }
});

// Delete a policy
PolicyRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PolicyModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Policy deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the policy." });
  }
});

module.exports = {PolicyRouter};
