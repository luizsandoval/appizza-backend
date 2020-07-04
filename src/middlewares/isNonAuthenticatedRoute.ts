const isNonAuthenticatedRoute = (requestUrl: string) => {
    const nonAuthenticatedRoutes = ['uploads', 'signIn', 'users'];

    const isNonAuthenticatedRoute = nonAuthenticatedRoutes
        .some(route => requestUrl.includes(route));

    return isNonAuthenticatedRoute;
};

export default isNonAuthenticatedRoute;
