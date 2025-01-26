const userModel = require('../models/user.model');
const accessTokenModel = require('../models/access-token.model');
const responses = require('../services/response.service');
const jwt = require('jsonwebtoken');

function register(email, password, verifyPassword) {
    return new Promise(async (resolve, reject) => {
        try {

			console.log("\n\n\n\nemail: ",email)
            const user = await userModel.scan('email').eq(email).exec();
			console.log(user.count);
            if (user.count > 0) {
                reject(responses.userAlreadyExists());
                return;
            }
            const registeredUser = await userModel.create({
                email: email,
                password: password,
            });
            resolve(registeredUser);
        } catch (error) {
					console.log(error);
          reject(responses.errorRegisteringUser(error));
        }
    });
}

function login(email, password, req) {
    return new Promise(async (resolve, reject) => {
        if (!email || email === '') {
            reject(responses.fieldRequired('EMAIL'));
            return;
        }

        if (!password || password === '') {
            reject(responses.fieldRequired('PASSWORD'));
            return;
        }

        try {
            const userResults = await userModel.query('email').eq(email).exec();
            if (userResults.count === 0) {
                reject(responses.wrongEmailOrPassword());
                return;
            }

            const user = userResults[0];

            user.isValid(password, async (error, isMatch) => {
                if (error) {
                    console.log(error);
                    reject(responses.errorLoginIn(error));
                    return;
                }

                if (isMatch) {
                    jwt.sign({ user }, process.env.JWT_SECRET, async (error, token) => {
                        if (error) {
                            reject(responses.errorLoginIn(error));
                            return;
                        }

                        try {
                            const data = await accessTokenModel.create({
                                accessToken: token,
                                userId: user.id,
                                ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                            });

                            resolve({ accessToken: data.accessToken, user });
                        } catch (error) {
                            reject(responses.errorSavingAccessToken(error));
                        }
                    });
                } else {
                    reject(responses.wrongEmailOrPassword());
                }
            });
        } catch (error) {
            reject(responses.errorFindingUser(error));
        }
    });
}

function verify_token(token) {
    return new Promise(async (resolve, reject) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const email = decodedToken.user.email;

            await accessTokenModel.create({
                accessToken: token,
            });

            const userResults = await userModel.query('email').eq(email).exec();
            if (userResults.count === 0) {
                reject(responses.errorGettingAuthorizedUser());
                return;
            }

            resolve(userResults[0]);
        } catch (error) {
            reject(responses.errorVerifyingToken(error));
        }
    });
}

module.exports = {
    register: register,
    login: login,
    verify_token: verify_token,
};
