const projectModel = require("../Models/Project");
const { errorResponse, successResponse } = require("../Utils/Response");

module.exports = {
  createNewProject: async (req, res) => {
    try {
      const userId = req.headers?.userId;
      const title = req.body?.title;

      console.log("userId", userId, "title", title);
      if (!userId) {
        errorResponse(res, error, "userId is required !", 401);
      }

      if (!title.trim()) {
        errorResponse(res, error, "Title is required !");
      }

      const result = await projectModel.create({ title, userId });
      if (result) {
        successResponse(res, result, "successfully created new project");
      }
    } catch (error) {
      errorResponse(res, error, "error while creating new project");
    }
  },

  getProjectsList: async (req, res) => {
    try {
      const result = await projectModel.find();
      successResponse(res, result, "project list fetched successfully");
    } catch (error) {
      errorResponse(res, error, "error while fetching projects");
    }
  },
};
