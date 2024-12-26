const User = require("../Model/user.model");

module.exports.getUserData = async (req, res) => {
  User.findAll()
    .then((result) => {
      res.status(200).json({ message: "success", data: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: "Failure" });
    });
};

module.exports.deleteUserData = async (req, res) => {
  const { id } = req.params;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("User delete successfully");
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Failure" });
    });
};

module.exports.editUserData = async (req, res) => {
  try {
    const { id, name, usersendemail, mobile } = req.body;
    console.log(id,)
    let data = await User.findOne({ where: { id } });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(data)
    data.username = name ? name : data.username;
    data.email = usersendemail ? usersendemail : data.email;
    data.phoneNo = mobile ? mobile : data.phoneNo;
    await data.save();
    res.status(200).json({ message: "Success", data });
  } catch (err) {
    console.error(err);

    res.status(400).json({ message: "Failure", error: err.message });
  }
};

module.exports.addUserData = async (req, res) => {
  const { username, phoneNo, email } = req.body;
  console.log(username,phoneNo,email,"call this function")
  User.create({
    username,
    email,
    phoneNo,
  })
    .then((result) => {
      console.log("Data add successfully");
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "failure" });
    });
};
