const notificationModel = require('../models/notification.model');
const userNotificationModel = require('../models/userNotification.model');

TYPES = [''];

function create(text, link, users) {
	notification = notificationModel.create({
		text: text,
		link: link,
		users: users,
	});

	users.forEach(function(countElement) {
		userNotificationModel.create({
			user: user,
			notification: notification,
		});
	});

	return notification;
}

function seen(id) {}

function getUserNotification() {}

function hide() {}
