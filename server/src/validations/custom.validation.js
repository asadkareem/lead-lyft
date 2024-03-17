const objectId = (value, helpers) => {
	if (!value.match(/^[0-9a-fA-F]{24}$/)) {
		return helpers.message('"{{#label}}" must be a valid mongo id');
	}
	return value;
};

const password = (value, helpers) => {
	if (value.length < 8) {
		return helpers.message('password must be at least 8 characters');
	}
	if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
		return helpers.message(
			'password must contain at least 1 letter and 1 number'
		);
	}
	return value;
};
const actionStatus = (value, helpers) => {
	// if (value.toUpperCase() === 'INCOMPLETE') {
	// 	return helpers.message(
	// 		'action status should be either COMPLETED or INPROGRESS'
	// 	);
	// }

	if (
		value.toUpperCase() === 'COMPLETED' ||
		value.toUpperCase() === 'INPROGRESS'
		// value.toUpperCase() !== 'INPROGRESS'
	) {
		return value;
	} else {
		return helpers.message(
			'action status should be either COMPLETED or INPROGRESS'
		);
	}

	// if (value.toUpperCase() !== 'INPROGRESS') {
	// 	return helpers.message(
	// 		'action status should be either COMPLETED or INPROGRESS...'
	// 	);
	// }

	return value;
};

module.exports = {
	objectId,
	password,
	actionStatus,
};
