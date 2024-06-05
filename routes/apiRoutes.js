const router = require("express").Router();
const petsController = require("../controllers/pets-controller");


router
  .route("/pets")
  .get(petsController.getAllPets)
//   .post(petsController.postPets);

// router
//   .route("/warehouses/:warehouseId")
//   .get(warehouseController.getOneWarehouse)
//   .put(warehouseController.editWarehouse)
//   .delete(warehouseController.deleteWarehouse);

// router
//   .route("/warehouses/:warehouseId/inventories/")
//   .get(warehouseController.getWarehouseInventory);

module.exports = router;
