const express = require("express");
const ReturnPolicyRouter = express.Router();
const ReturnPolicyModel = require("../Model/ReturnPolicy");

// Create a new policy
ReturnPolicyRouter.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const policy = await ReturnPolicyModel.create({ description });
    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the policy." });
  }
});

// Update a policy
ReturnPolicyRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedPolicy = await ReturnPolicyModel.findByIdAndUpdate(
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
ReturnPolicyRouter.get("/", async (req, res) => {
  try {
    const policies = await ReturnPolicyModel.find();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the policies." });
  }
});

// Retrieve a specific policy
ReturnPolicyRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await ReturnPolicyModel.findById(id);
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
ReturnPolicyRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ReturnPolicyModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Policy deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the policy." });
  }
});

module.exports = {ReturnPolicyRouter};
