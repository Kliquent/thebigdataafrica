export const sanitizeUrl = (data) => {
	if (!data.url) {
		return;
	}
	const regex = /\/[0-9]+/g; //Adapt to your context
	const urlWithoutParameter = data.url.replace(regex, '/:id');
	data.url_sanitized = urlWithoutParameter;
};
