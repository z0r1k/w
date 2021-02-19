const Joi = require('joi')

module.exports = Joi.object({
  area_width: Joi.number().positive().required(),
  area_height: Joi.number().positive().required(),

  viewport_width: Joi.number().positive().required(),
  viewport_height: Joi.number().positive().required(),

  square_dimensions: Joi.number().positive().required(),

  x: Joi.number().positive().required(),
  y: Joi.number().positive().required(),

  tiles: Joi.number().positive().required(),
})
