const router = require("express").Router();
const petsController = require("../controllers/pets-controller");


router
  .route("/pets")
  .get(petsController.getAllPets)
//   .post(petsController.postPets);

router
  .route("/pets/:petId")
  .get(petsController.getOnePet)
//   .put(petsController.editPet)
//   .delete(petsController.deletePet);

module.exports = router;
