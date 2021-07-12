const Voice = require("../models/Voice.model");

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
    const { audio } = req.body;
    if (!audio) {
      return res.status(401).json({
        error: "Необходимо выбрать файл",
      });
    }
    try {
      const createVoice = await new Voice({ name });
      await createVoice.save();
      res.json(createVoice);
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteVoice: async (req, res) => {
    try {
      const deleteVoice = await Voice.findByIdAndDelete(req.params.id);
      if (!deleteVoice) {
        return res.json({
          message: "Не удалось удалить запись. Укажите верный ID",
        });
      }
      res.json(deleteVoice);
    } catch (e) {
      console.log(e.message);
    }
  },
};
