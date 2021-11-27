function redirectUrl(page, session) {
	if (session.user) {
		return null;
	} else {
		if (page.path.startsWith('/auth')) {
			return null;
		}
		return '/auth/login';
	}
}

export default redirectUrl;
