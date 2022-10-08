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
  const { unitName, unitComment, userId } = req.body;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  const unit = await Unit.create({
    name: unitName,
    comment: unitComment,
  });
  return await user.addUnit(unit);
};

export const updateUnit = async (req, res, next) => {
  const { unitId } = req.params;
  const { unitName, unitComment } = req.body;
  const unitForUpdate = await Unit.findOne({
    where: {
      id: unitId,
    },
  });
  return await unitForUpdate.update({
    name: unitName,
    comment: unitComment,
  });
};

export const deleteUnit = async (req, res, next) => {
  const { unitId } = req.params;
  const unitForDelete = await Unit.findOne({
    where: {
      id: unitId,
    },
  });
  return await unitForDelete.delete();
};

//todo: 필요 컨트롤러들 지속적으로 추가
