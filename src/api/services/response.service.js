class ResponseService {
	static notAuthenticated() {
		return { message: 'NOT_AUTHENTICATED' };
	}

	static accessTokenNotIncluded() {
		return { message: 'ACCESS_TOKEN_NOT_INCLUDED' };
	}

	static greetUser(payload) {
		return { message: 'GREET_USER', user: payload };
	}

	static accessTokenExpired() {
		return { message: 'ACCESS_TOKEN_EXPIRED' };
	}

	static errorGettingAuthorizedUser() {
		return { message: 'ERROR_GETTING_AUTHORIZED_USER' };
	}

	static errorVerifyingToken(error) {
		return { message: 'ERROR_VERIFYING_TOKEN', error };
	}

	static fieldRequired(fieldName) {
		return { message: fieldName + '_FIELD_REQUIRED' };
	}

	static passwordsDoNotMatch() {
		return { message: 'PASSWORDS_DO_NOT_MATCH' };
	}

	static userAlreadyExists() {
		return { message: 'USER_ALREADY_EXISTS' };
	}

	static wrongEmailOrPassword() {
		return { message: 'WRONG_EMAIL_OR_PASSWORD' };
	}

	static errorLoginIn(error) {
		return { message: 'ERROR_LOGIN_IN', errors: error };
	}
}

module.exports = ResponseService;
