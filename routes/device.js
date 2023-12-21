const express= require ("express")
const router = express.Router();
const {createData, getAllData, deleteData, updateData} = require("../controllers/device");

router.post('/add-device',createData);
router.get('/get-device',getAllData);
router.delete('/delete-device/:id',deleteData);
router.put('/update-device/:id',updateData);

module.exports = router;