const Voice = require("../models/Voice.model");
const path = require('path')

module.exports.voicesControllers = {
  getVoicesById: async (req, res) => {
    try {
      const getVoices = await Voice.find({ speaker: req.params.id });
      res.json(getVoices);
    } catch (e) {
      console.log(e.message);
    }
  },
  createVoice: async (req, res) => {

    // if (!audio) {
    //   return res.status(401).json({
    //     error: "Необходимо выбрать файл",
    //   });
    // }
    // if (!name) {
    //   return res.status(401).json({
    //     error: "Необходимо указать название",
    //   });
    // }
    try {
      const createVoice = await Voice.create({
        name,
        audio,
        speaker: req.user.id,
      });
      return res.json(createVoice);
    } catch (e) {
      console.log(e.message);
    }
  },
  postVoice: async (req, res) => {
    const voice = req.files.voice;
    const newFileName = `./assets/${Math.random() * 10000}${path.extname(voice.name)}`
    try {
      const speaker = await Voice.findById(req.params.id);

      speaker.voice = newFileName

      voice.mv(newFileName, (err) => {
        if(err) {
          console.log("Error")
        } else {
          res.json("Файл загружен")
        }
      })
    } catch (e) {

    }
  },
  deleteVoice: async (req, res) => {
    const { id } = req.params;
    try {
      const voice = await Voice.findById(id);

      if (voice.speaker.toString() === req.user.id) {
        await voice.remove();
        res.json("удалено");
      }

      return res.status(401).json("Ошибка. Нет доступа");
    } catch (e) {
      console.log(e.message);
    }
  },
};
