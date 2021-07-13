const Speaker = require("../models/Speaker.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.speakersController = {
  getAllSpeakers: async (req, res) => {
    try {
      const getSpeakers = await Speaker.aggregate([
        {
          $lookup: {
            from: "voices",
            as: "voices",
            let: { speaker: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$speaker", "$$speaker"] } } },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            category: 1,
            voices: 1,
          },
        },
      ]);
      res.json(getSpeakers);
    } catch (e) {
      console.log(e.message);
    }
  },
  patchSpeaker: async (req, res) => {
    try {
      const { firstName, lastName, category } = req.body;
      const id = req.body.id;
      const options = { new: true };

      const patchSpeaker = await Speaker.findByIdAndUpdate(
        id,
        { firstName, lastName, category },
        options
      );
      res.json(patchSpeaker);
    } catch (e) {
      return res.status(401).json({
        error: e.message,
      });
    }
  },
  registerSpeaker: async (req, res) => {
    const { login, password, firstName, lastName, category } = req.body;
    console.log(firstName);
    if (!login) {
      return res.status(401).json({
        error: "Необходимо указать login",
      });
    }

    if (!password) {
      return res.status(401).json({
        error: "Необходимо указать пароль",
      });
    }
    try {
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const registerSpeaker = await new Speaker({
        login: login,
        password: hash,
        firstName: firstName,
        lastName: lastName,
      });
      await registerSpeaker.save();
      res.status(201).json({ message: "Диктор создан" });
    } catch (e) {
      console.log(e.message);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  },
  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await Speaker.findOne({ login: login });
    if (!candidate) {
      return res.status(401).json("Неверный логин");
    }
    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json("Неверный пароль");
    }
    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });

    res.json({
      token,
    });
  },
};
