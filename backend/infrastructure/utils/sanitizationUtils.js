const sanitizeInput = (payload) => {
	if (typeof payload !== 'object') throw new Error('Dados inválidos.');

	let sanitizedPayload = {};

	Object.keys(payload).forEach((key) => {
		try {
			const value = payload[key];

			if (typeof value === 'number') {
				sanitizedPayload[key] = value;
				return;
			}	

			const sanitizedValue = payload[key]
				.replace(/[^a-zA-Z0-9áéíóúàèìòùâêîôûãõç\s@._-]/g, '')
				.replace(/\\/g, '\\\\')
				.replace(/'/g, "\\'")
				.replace(/"/g, '\\"')
				.replace(/;/g, '\\;')
				.replace(/--/g, '\\--')
				.replace(/#/g, '\\#')
				.replace(/\/\*/g, '\\/*')
				.replace(/\*\//g, '\\*/');

			sanitizedPayload[key] = sanitizedValue;
		} catch (e) {
			console.log('erro aqui:', key, e);
		}
	});
	console.log(sanitizedPayload);
	return sanitizedPayload;
};

module.exports = { sanitizeInput };
