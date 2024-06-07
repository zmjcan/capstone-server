const router = require("express").Router();
const petsController = require("../controllers/pets-controller");
const imgController = require("../controllers/img-controller");


router
  .route("/pets")
  .get(petsController.getAllPets)
  .post(petsController.postOnePet);

router
  .route("/pets/:petId")
  .get(petsController.getOnePet)
  .patch(petsController.updateOnePet);

router
  .route("/upload")
  .get(imgController.getImg)
  .post(imgController.uploadImg);

module.exports = router;
