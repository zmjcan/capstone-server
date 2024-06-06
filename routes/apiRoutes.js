const router = require("express").Router();
const petsController = require("../controllers/pets-controller");

router
  .route("/pets")
  .get(petsController.getAllPets)
  .post(petsController.postOnePet);

router
  .route("/pets/:petId")
  .get(petsController.getOnePet)
  .patch(petsController.updateOnePet);

router
  .route("/pets/upload")
  .post(petsController.uploadImg);

module.exports = router;
