const mongoose = require("mongoose");
const episodeModel = require("../Models/Episode");
const projectModel = require("../Models/Project");
const { errorResponse, successResponse } = require("../Utils/Response");

module.exports = {
  createNewEpisode: async (req, res) => {
    try {
      const { name, projectId, content } = req.body;
      const { userId } = req.headers;

      if (!userId)
        errorResponse(
          res,
          "User id required !",
          "Failed while creating new episode",
          401
        );
      if (!projectId) throw "Project id is required";
      if (!name) throw "Episode name is required";

      const project = await projectModel.findOne({
        _id: projectId,
        userId: userId,
      });

      if (!project) throw "Project doesn't exist with this user";

      const result = await episodeModel.create({
        name,
        content,
        userId,
        projectId,
      });

      successResponse(res, result, "Successfully created new Episode");
    } catch (error) {
      errorResponse(res, error, "Failed while creating new episode");
    }
  },

  getEpisodeList: async (req, res) => {
    try {
      const { projectId } = req.params;
      if (!projectId) throw "projectId is required!";

      const project = await projectModel.findById(projectId);

      if (!project) throw "Project is not exist";

      const result = await episodeModel.aggregate([
        {
          $match: {
            projectId: new mongoose.Types.ObjectId(projectId),
          },
        },
        {
          $project: {
            name: 1,
            date: "$updatedAt",
            id: "$_id",
            _id: 0,
          },
        },
        {
          $sort: {
            date: -1,
          },
        },
      ]);

      successResponse(
        res,
        { episodes: result, projectName: project?.title },
        "Episodes fetched successfully"
      );
    } catch (error) {
      errorResponse(res, error, "Failed while fetching episodes");
    }
  },

  getEpisodeById: async (req, res) => {
    try {
      const { episodeId } = req.params;

      const [result] = await episodeModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(episodeId),
          },
        },
        {
          $lookup: {
            localField: "projectId",
            foreignField: "_id",
            from: "projects",
            as: "project",
          },
        },
        {
          $unwind: "$project",
        },
        {
          $project: {
            name: 1,
            content: 1,
            _id: 0,
            projectName: "$project.title",
          },
        },
      ]);
      successResponse(res, result, "Successfully fetched episode content");
    } catch (error) {
      errorResponse(res, error, "Failed while fetching episode content");
    }
  },

  editEpisode: async (req, res) => {
    try {
      const { episodeId } = req.params;
      const { name, content } = req.body;
      const { userId } = req.headers;

      if (!episodeId) throw "Episode id is required !";
      if (!name) throw "Episode name is required !";

      const result = await episodeModel.updateOne(
        { _id: episodeId, userId },
        {
          name,
          content,
        }
      );
      if (!result) throw "Something went wrong while updating episode";

      successResponse(res, result, "Successfully Updated episode");
    } catch (error) {
      errorResponse(res, error, "Something went wrong while updating episode");
    }
  },
};
