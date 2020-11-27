const isNonAuthenticatedRoute = (requestUrl: string) => {
    const nonAuthenticatedRoutes = ['uploads', 'auth', 'establishments', 'users'];

    const isNonAuthenticatedRoute = nonAuthenticatedRoutes
        .some(route => requestUrl.includes(route));

    return isNonAuthenticatedRoute;
};

export default isNonAuthenticatedRoute;
