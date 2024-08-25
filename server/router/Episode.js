const {
  createNewEpisode,
  getEpisodeList,
  getEpisodeById,
  editEpisode,
} = require("../Controllers/Episode");

const router = require("express").Router();

router.post("/create", createNewEpisode);

router.get("/list/:projectId", getEpisodeList);

router.get("/content/:episodeId", getEpisodeById);

router.put("/content/:episodeId", editEpisode);



module.exports = router;
