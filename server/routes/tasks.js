const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// @route   GET /api/tasks
// @desc    Get all tasks for user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let query = { assignedTo: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email avatar")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email avatar")
      .populate("createdBy", "name email avatar");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this task" });
    }

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Task title is required"),
    body("status").optional().isIn(["todo", "in-progress", "completed"]),
    body("priority").optional().isIn(["low", "medium", "high"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.create({
        ...req.body,
        assignedTo: req.user._id,
        createdBy: req.user._id,
      });

      const populatedTask = await Task.findById(task._id)
        .populate("assignedTo", "name email avatar")
        .populate("createdBy", "name email avatar");

      res.status(201).json(populatedTask);
    } catch (error) {
      console.error("Create task error:", error);
      res
        .status(500)
        .json({ message: "Error creating task", error: error.message });
    }
  },
);

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("assignedTo", "name email avatar")
      .populate("createdBy", "name email avatar");

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});

// @route   GET /api/tasks/stats/summary
// @desc    Get task statistics
// @access  Private
router.get("/stats/summary", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });

    const stats = {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    };

    res.json(stats);
  } catch (error) {
    console.error("Get stats error:", error);
    res
      .status(500)
      .json({ message: "Error fetching statistics", error: error.message });
  }
});

module.exports = router;

