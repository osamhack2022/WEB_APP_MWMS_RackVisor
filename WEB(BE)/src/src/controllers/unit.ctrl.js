const { User, Unit } = require('../models');

export const getUnits = async (req, res, next) => {
  const userId = req.body;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  const units = await user.getUnits();

  return res.send(units);
};

export const addUnit = async (req, res, next) => {
  const { name, comment, userId } = req.body;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  const unit = await Unit.create({
    name: name,
    comment: comment,
  });
  return await user.addUnit(unit);
};
