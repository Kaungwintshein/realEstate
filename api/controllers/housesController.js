import House from "../models/House.js";

export const createHouse = async (req, res, next) => {
  const newHouse = new House(req.body);
  try {
    const savedHouse = await newHouse.save();
    res.status(200).json(savedHouse);
  } catch (err) {
    next(err);
  }
};
export const updateHouse = async (req, res, next) => {
  try {
    const updateHouse = await House.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHouse);
  } catch (err) {
    next(err);
  }
};
export const deleteHouse = async (req, res, next) => {
  try {
    const deleteHouse = await House.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "House delete Success.", deleteHouse });
  } catch (err) {
    next(err);
  }
};
export const getHouse = async (req, res, next) => {
  try {
    const getHouse = await House.findById(req.params.id);
    res.status(200).json(getHouse);
  } catch (err) {
    next(err);
  }
};
export const getHouses = async (req, res, next) => {
  const qNew = req.query.new;
  const qType = req.query.type;
  try {
    let houses;
    if (qNew) {
      houses = await House.find().sort({ createdAt: -1 }).limit(1);
    } else if (qType) {
      houses = await House.find({
        type: {
          $in: [qType],
        },
      });
    } else {
      houses = await House.find();
    }
    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};
