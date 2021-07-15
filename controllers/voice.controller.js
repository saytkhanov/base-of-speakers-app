const Voice = require("../models/Voice.model");
const path = require('path')

module.exports.voicesControllers = {
  getAllVoice: async (req, res) => {
    try {
      const getAllVoice = await Voice.find()
      res.json(getAllVoice)
    } catch (e) {
      console.log(e.message)
    }
  },
  getVoicesById: async (req, res) => {
    try {
      const getVoices = await Voice.find({ speaker: req.params.id });
      res.json(getVoices);
    } catch (e) {
      console.log(e.message);
    }
  },
  createVoice:  (req, res) => {
    const file = req.files.voice;
    const fileName = file.name
    const url = path.resolve(__dirname, "../public/uploads/img/" + fileName)
    const urlForDB = "/uploads/img/" + fileName
    try {
      file.mv(url, async (err) => {
        if(err) {
          console.log(err)
        } else {
          const createVoice = await new Voice({
            name: fileName,
            audio: urlForDB,
            speaker: req.user.id
          })
          await createVoice.save();
          res.json("Запись успешно добавлена")
        }
      });
    } catch (e) {
      console.log(e.message)
    }
  },
  // postVoice: async (req, res) => {
  //   const voice = req.files.voice;
  //   const newFileName = `./public/${Math.random() * 10000}${path.extname(voice.name)}`
  //   try {
  //     const speaker = await Voice.findById(req.params.id);
  //
  //     speaker.voice = newFileName
  //
  //     voice.mv(newFileName, (err) => {
  //       if(err) {
  //         console.log("Error")
  //       } else {
  //         res.json("Файл загружен")
  //       }
  //     })
  //   } catch (e) {
  //
  //   }
  // },
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
