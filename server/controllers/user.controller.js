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