const Voice = require("../models/Voice.model");
const path = require("path");
const httpStatus = require("http-status");

module.exports.voicesControllers = {
  getAllVoice: async (req, res) => {
    try {
      const getAllVoice = await Voice.find();
      res.json(getAllVoice);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  getVoicesById: async (req, res) => {
    try {
      const getVoices = await Voice.find({ speaker: req.params.id });
      res.json(getVoices);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  getVoicesByIdForAuth: async (req, res) => {
    try {
      const getVoices = await Voice.find({ speaker: req.user.id });
      res.json(getVoices);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
  createVoice: async (req, res) => {
    const { title, description, file } = req.body;
    if (!file) {
      return res.status(httpStatus.BAD_REUEST).res.json({
        error: "Вы не выбрали файл",
      });
    }

    if (!title) {
      return res.status(httpStatus.BAD_REUEST).res.json({
        error: "Напишите заголовок",
      });
    }

    if (!description) {
      return res.status(httpStatus.BAD_REUEST).res.json({
        error: "Добавьте описание",
      });
    }
    try {
          const createVoice = await new Voice({
            title,
            audio: file,
            description,
            speaker: req.user.id
          })
          await createVoice.save();
          res.json(createVoice)
        } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
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
