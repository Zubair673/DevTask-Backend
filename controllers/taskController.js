import Task from "../models/Task.js";

// ===============================
// Create Task
// ===============================
export const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      course,
      category,
      priority,
      difficulty,
      estimatedTime,
      dueDate,
      taskType,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      course,
      category,
      priority,
      difficulty,
      estimatedTime,
      dueDate,
      taskType,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Get All Tasks
// ===============================
export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Get Single Task
// ===============================
export const getTaskById = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Update Task
// ===============================
export const updateTask = async (req, res) => {
  try {

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Delete Task
// ===============================
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};