"use strict";

const House = require("../models/house.model");
const HouseImage = require("../models/house_image_url.model");
const RequestedHouse = require("../models/requested_house_type.model");
const { slash } = require("../utils/helpers");
const {
  HOUSE_IMAGES_ARE_REQUIRED_ERR,
} = require("../middlewares/errors.middleware");

exports.createHouse = async (req, res, next) => {
  const {
    price,
    description,
    houseType,
    areaSize,
    city,
    subcity,
    addressName,
    mapLocation,
    bedrooms,
    bathrooms,
    floorNumber,
    agentName,
    agentNumber,
    secondAgentNumber,
    marketStatus,
    isActive,
    furnishingStatus,
    realestateType,
  } = req.body;

  const admin = res.locals.admin;

  const images = req.files["images"];
  const coverImage = req.files["coverImage"][0];

  console.log(`/houses_images/${coverImage.filename}`);

  if (images.length < 2) {
    next({ statusCode: 400, message: HOUSE_IMAGES_ARE_REQUIRED_ERR });
    return;
  }

  try {
    const newHouse = await House.create({
      price: price,
      description: description,
      houseType: houseType,
      areaSize: areaSize,
      city: city,
      subcity: subcity,
      addressName: addressName,
      mapLocation: mapLocation,
      furnishingStatus: furnishingStatus,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      floorNumber: floorNumber,
      agentName: agentName,
      agentNumber: agentNumber,
      secondAgentNumber: secondAgentNumber,
      marketStatus: marketStatus,
      isActive: isActive,
      adminId: admin.id,
      realestateType: realestateType,
      coverImage: `/houses_images/${coverImage.filename}`,
    });

    for (var index in images) {
      await HouseImage.create({
        imageUrl: `/houses_images/${images[index].filename}`,
        houseId: newHouse.id,
      });
    }

    res.status(200).json({ newHouse: newHouse });
  } catch (e) {
    next(e);
  }
};

exports.getHouses = async (req, res, next) => {
  var { page } = req.query;

  if (!page || page < 1) {
    page = 1;
  }

  try {
    const houses = await House.findAll({
      where: { isActive: true },
    });

    res.status(200).json({ houses: houses });
  } catch (e) {
    next(e);
  }
};

exports.getHouseDetails = async (req, res, next) => {
  const { houseId } = req.query;

  console.log(houseId);

  try {
    const house = await House.findByPk(houseId);
    res.status(200).json({ house: house });
  } catch (e) {
    next(e);
  }
};

exports.getHouseImages = async (req, res, next) => {
  const { houseId } = req.query;

  try {
    const houseImages = await HouseImage.findAll({
      where: { houseId: houseId },
    });

    res.status(200).json({ houseImages: houseImages });
  } catch (e) {
    next(e);
  }
};

exports.getRequestedHouses = async (req, res, next) => {
  var { offset } = req.query;

  if (!offset || offset < 1) {
    offset = 1;
  }

  try {
    const houses = await RequestedHouse.findAll({
      offset: (offset - 1) * 50,
      limit: 50,
      order: [["createdAt", "DESC"]],
    });

    console.log(houses);

    res.status(200).json({ requestedHouses: houses });
  } catch (e) {
    next(e);
  }
};

exports.editHouse = async (req, res, next) => {};

exports.deleteHouse = async (req, res, next) => {
  const { houseId } = req.query;

  console.log(houseId);

  try {
    const house = await House.findByPk(houseId);

    if (!house) {
      next({ statusCode: 404, message: HOUSE_NOT_FOUND });
    }

    house.isActive = false;
    await house.save();

    res.status(200).json({ message: "House deleted!" });
  } catch (e) {
    next(e);
  }
};

exports.editHouseImages = async (req, res, next) => {};

exports.addAdvertisment = async (req, res, next) => {};

exports.removeAdvertisment = async (req, res, next) => {};

exports.editAdvertisment = async (req, res, next) => {};
