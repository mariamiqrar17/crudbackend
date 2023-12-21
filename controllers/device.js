const Device = require("../models/device");

const createData = async (req, res) => {
  console.log(res.body)
    try{
      const { title, brand, price, description } = req.body;
      if (!req.body.title || !req.body.brand || !req.body.price || !req.body.description) {
        res.status(400).send({ message: "Please fill all the input fields" });
        return;
      }

      const device = new Device({
        title, brand, price, description,
      });

      await device
        .save()
        .then((data) => {
          res.send({
            message: "Data added successfully!!",
            device: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while adding data",
          });
        });
      }catch(error){
        res.status(500).json({ error: "Internal server error" });
      }
  
};

const getAllData = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json({
      devices,
      message: "Data Fetched Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteData = async (req, res) => {
  try {
    const deletedResource = await Device.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateData = async (req, res) => {
  try {
    const stateId = req.params.id;
    const { title, brand, price, description } = req.body;

    const state = await Device.findByIdAndUpdate(
      stateId,
      { title, brand, price, description },
      { new: true, runValidators: true }
    );

    if (!state) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      state,
      message: "Data updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createData, getAllData, deleteData, updateData };
