const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const outletSkuService = require('../services/outletSku.service')

exports.createOutletSku = async (req, res ) => {
  try {
    data = await outletSkuService.create(req.body, req.user)
    res.json(data)
  } catch(e) {
    next(e)
  }
}

rexports.createOutletSku = async (req, res ) => {
  try {
    data = await outletSkuService.update(req.body, req.user)
    res.json(data)
  } catch(e) {
    next(e)
  }

}

exports.createOutletSku = async (req, res ) => {
  try {
    data = await outletSkuService.delete(req.body, req.user)
    res.json(data)
  } catch(e) {
    next(e)
  }
}


module.exports = router;
