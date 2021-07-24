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
  getVoicesByIdForAuth: async (req, res) => {
    try {
      const getVoices = await Voice.find({ speaker: req.user.id });
      res.json(getVoices);
    } catch (e) {
      console.log(e.message);
    }
  },
  createVoice: async (req, res) => {
    const {title, description, file} = req.body
    try {
          const createVoice = await new Voice({
            title,
            audio: file,
            speaker: req.user.id
          })
          await createVoice.save();
          res.json(createVoice)
        } catch (e) {
      console.log(e.message)
    }
  },

  uploadVoice:  (req, res) => {
    const file = req.files.file;
    const fileName = file.name
    const url = path.resolve(__dirname, "../public/uploads/img/" + fileName)
    const urlForDB = "/uploads/img/" + fileName
    try {
      file.mv(url, async (err) => {
        if(err) {
          console.log(err)
        } else {
          res.json({
            success: "Запись успешно добавлена",
            file: urlForDB
          })
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
         return res.json(voice);
      }

      return res.status(401).json("Ошибка. Нет доступа");
    } catch (e) {
      console.log(e.message);
    }
  },
};
