const { User, Unit } = require('../models');

export const getUnits = async (req, res, next) => {
  const units = await Unit.findall({
    include: {
      model: User,
      as: 'UserUnit',
    },
  }).toJSON();

  return res.send(units);
};

export const addUnit = async (req, res, next) => {
  const { name, comment } = req.body;
  await Unit.create(
    {
      name: name,
      comment: comment,
    },
    {
      include: [User],
    }
  );
};
