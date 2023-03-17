import { response } from "express";
import Data from "../models/DataModel.js";
import path from "path";
import fs from "fs";
import db from "../config/Database.js";
import { DATE, Sequelize } from "sequelize";
export const getData = async (req, res) => {
  try {
    const response = await Data.findAll();
    res.json({data:response, success:true});
  } catch (err) {
    console.log(err);
  }
};
export const getDataById = async (req, res) => {
  try {
    const response = await Data.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const saveData = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "no file Upload" });
  const sj = req.body.sj;
  const nopol = req.body.nopol;
  const driver = req.body.driver;
  const site = req.body.site;
  const transportir = req.body.transportir;
  const berat = req.body.berat;
  const status = req.body.status;
  const image = req.files.image;
  const imageSize = image.data.length;
  const ext = path.extname(image.name);
  const imageName = image.md5 + ext;
  const allowedType = [".png", ".jpg", ".jpeg"];

  const url = `${req.protocol}://${req.get("host")}/images/${imageName}`;
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid images" });
  if (imageSize > 5000000)
    return res.status(422).json({ msg: "image must be less 5mb" });

  image.mv(`./public/images/${imageName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Data.create({
        image: imageName,
        sj: sj,
        nopol: nopol,
        driver: driver,
        site: site,
        transportir: transportir,
        berat: berat,
        status: status,
        url: url,
      });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateData = async (req, res) => {
  const data = await Data.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!data) return res.status(404).json({ msg: "No Data Found" });

  let imageName = "";
  if (req.files === null) {
    imageName = data.image;
  } else {
    const image = req.files.image;
    const imageSize = image.data.length;
    const ext = path.extname(image.name);
    imageName = image.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (imageSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${data.image}`;
    fs.unlinkSync(filepath);

    image.mv(`./public/images/${imageName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const sj = req.body.sj;
  const nopol = req.body.nopol;
  const driver = req.body.driver;
  const site = req.body.site;
  const transportir = req.body.transportir;
  const berat = req.body.berat;
  const status = req.body.status;
  const url = `${req.protocol}://${req.get("host")}/images/${imageName}`;

  try {
    await Data.update(
      {
        sj: sj,
        image: imageName,
        url: url,
        nopol: nopol,
        driver: driver,
        site: site,
        transportir: transportir,
        berat: berat,
        status: status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteData = async (req, res) => {
  const data = await Data.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!data) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${data.image}`;
    fs.unlinkSync(filepath);
    await Data.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatus = async (req, res) => {
  const data = await Data.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!data) return res.status(404).json({ msg: "No Data Found" });
  const status = req.body.status;

  try {
    await Data.update(
      {
        status: status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly", data: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const maxSj = async (req, res) => {
  const Op = Sequelize.Op;
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date().getTime();
  console.log(NOW)
  const data =await Data.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('sj')), 'maxsj']],
    where:{
      createdAt:{
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW
    }
  },
    raw: true,
  });
  return res.status(200).json({msg:"data", data:data[0].maxsj})
};
