const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: "Name is required!" });
  }
};

const checkBoolean = (req, res, next) => {
  const { is_online, is_store } = req.body;

  if (is_online === true || is_online === false || !is_online && is_store === true || is_store === false || !is_store) {
    next();
  } else {
    res.status(400).json({ error: "is_online & is_store must be boolean values!" });
  }
};

module.exports = { checkName, checkBoolean };
