const express = require("express");
const { getUserData, addUserData, deleteUserData, editUserData } = require("../controllers/user.controllers");


const router = express.Router()

router.get("/get-data",getUserData)
router.post("/add-data",addUserData)
router.post("/edit-user",editUserData)
router.delete("/delete-user/:id",deleteUserData)

module.exports = router;