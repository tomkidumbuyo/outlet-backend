const userModel = require('../models/user.model');
const accessTokenModel = require('../models/access-token.model');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {*} email
 * @param {*} password
 * @param {*} verifyPassword
 */
function register (email, password, verifyPassword, req = false) {

  return new Promise(async (resolve, reject) => {
    if (!email || email == '') {
      reject('Please do not leave the email field blank');
    } else if(!password || password == '') {
      reject('Please do not leave the password field blank');
    } else {
      userModel.findOne({email: email}, (err, usr) => {
        if (err) {
          reject('Error loging in. ' + err);
          return;
        }
        if (!usr) {
          if (password == verifyPassword) {
            userModel.create({
              email: email,
              password: password
            },(err, usr ) => {
              if (err) {
                reject(err);
                return;
              }

              if(req) {
                login(email,password,req)
                .then(data => {
                  resolve(data);
                })
                .catch(err => {
                  reject(err);
                });
              } else {
                resolve(usr);
              }
            });
          }else{
            reject('password verification don\'t match password.');
          }
        }else{
          reject("User already exists.");
          return;
        }
      });
    }
  });
}

/**
 *
 * @param {*} email
 * @param {*} password
 */
function login (email, password, req ) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return new Promise((resolve, reject ) => {
    if (!email || email == '') {
      reject('Please do not leave the email field blank');
    } else if(!password || password == '') {
      reject('Please do not leave the password field blank');
    } else {
      userModel.findOne({email: email}, (err, usr ) => {
        if (err) {
          reject('Error loging in. ' + err);
          return;
        }
        if (!usr) {
          reject("User does not exist.");
          return;
        }
        usr.isValid(password, (err, isMatch ) => {
          if (err) {
            reject(err);
          }

          if (isMatch) {
            jwt.sign({user: usr}, process.env.JWT_SECRET, (err, token ) => {
              if (err) {
                reject(err);
                return;
              }
              accessTokenModel.create({
                  access_token: token,
                  user_id: usr._id,
                  ip_adress: ip,
              },(err, data ) => {
                if (err) {
                  reject(err);
                }
                data.user = usr;
                resolve({accessToken: data.access_token, user: usr});
              });
            });
          }else{
            reject('Error login in, password don\'t match.');
          }
        });
      });
    }
  });
}


/**
 *
 * @param {*} headers
 * @returns promise
 */
function verify_token (token){
  return new Promise(async (resolve, reject) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const email = decodedToken.user.email;

      accessTokenModel.create({
        access_token: token,
      }, (err, token) => {
        if (err || !token || token  == undefined) {
          reject('Error, access token expired. ' + err)
        }
        userModel.findOne({email: email}, (err, usr) => {
          if (err) {
            reject('Error getting authorized user. ' + err)
          }
          if (!usr) {
            reject('Authenticated user doesn\'t exist.')
          }
          resolve(usr);
        });
      })
    } catch (error) {
      reject('Error getting authorized user. ' + error)
    }




  });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function verify (req, res, next){
  if(req.headers.authorization !== undefined){
    const token = req.headers.authorization.split(' ')[1];
    verify_token(token)
    .then((usr) => {
      req.user = usr;
      next();
    })
    .catch((err) => {
      res.status(401).json({
        error: err
      });
    });
  }else{
    res.status(401).json({
      error: 'Authorization token not included.'
    });
  }
}


module.exports = {
  register: register,
  login: login,
  verify_token: verify_token,
  verify: verify,
};
