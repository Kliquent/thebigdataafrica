import userAgentParser from 'ua-parser-js';

export const parseUserAgent = (data) => {
	if (data.user_agent) {
		const ua = userAgentParser(data.user_agent);
		if (ua.browser) {
			data.user_agent_browser_name = ua.browser.name;
			data.user_agent_browser_version = ua.browser.major || ua.browser.version;
		}
		if (ua.os) {
			data.user_agent_os_name = ua.os.name;
			data.user_agent_os_version = ua.os.version;
		}
	}
};
