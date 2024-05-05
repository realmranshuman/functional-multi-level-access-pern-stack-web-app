const db = require("../models");

exports.assignRole = async (req, res) => {
  const { userId, roleName } = req.params;

  try {
    // Check if the user exists
    const user = await db.user.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check if the role exists
    const role = await db.role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(404).send({ message: "Role not found!" });
    }

    // Assign the role to the user
    await user.addRole(role);

    res.status(200).send({ message: `Role ${roleName} assigned successfully to the user!` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.userBoard = (req, res) => {
  const username = req.params.username;
  res.status(200).send(`"Hello User ${username}"`);
};

exports.adminBoard = (req, res) => {
  const username = req.params.username;
  res.status(200).send(`"Hello Admin ${username}"`);
};

exports.managerBoard = (req, res) => {
  const username = req.params.username;
  res.status(200).send(`"Hello Manager ${username}"`);
};