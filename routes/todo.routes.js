const express = require('express');
const router = express.Router();

const TodoController = require('./../controllers/TodoController');

const controller = new TodoController();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.patch("/:id", controller.update);
/*router.post("/", controller.store);
router.delete("/:id", controller.delete);*/

module.exports = router;