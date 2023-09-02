const express = require("express");
const beforePolicyRouter = express.Router();
const BeforeStartBeforeStartPolicyModel = require("../Model/BeforeStartPolicy.Model");

// Create a new policy
beforePolicyRouter.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const policy = await BeforeStartBeforeStartPolicyModel.create({ description });
    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the policy." });
  }
});

// Update a policy
beforePolicyRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedPolicy = await BeforeStartBeforeStartPolicyModel.findByIdAndUpdate(
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
beforePolicyRouter.get("/", async (req, res) => {
  try {
    const policies = await BeforeStartBeforeStartPolicyModel.find();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the policies." });
  }
});

// Retrieve a specific policy
beforePolicyRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await BeforeStartBeforeStartPolicyModel.findById(id);
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
beforePolicyRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BeforeStartBeforeStartPolicyModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Policy deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the policy." });
  }
});

module.exports = {beforePolicyRouter};
