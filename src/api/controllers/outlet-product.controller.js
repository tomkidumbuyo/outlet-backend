const outletProductService = require('../services/outletProduct.service')

exports.createOutletProduct =  async (req, res ) => {
  try {
    data = await outletProductService.create(req.body, req.user)
    res.json(data)
  } catch(e) {
    next(e)
  }
}

exports.updateOutletProduct =  async (req, res ) => {
  try {
    data = await outletProductService.update(req.body, req.user)
    res.json(data)
  } catch(e) {
    next(e)
  }

}

exports.deleteOutletProduct =  async (req, res ) => {
  try {
    data = await outletProductService.delete(req.body, req.user)
    res.json(data)
  } catch(e) {
    next(e)
  }
}


module.exports = router;
