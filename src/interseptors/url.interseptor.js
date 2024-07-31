const versionsUrl = '/versions';

export const UrlInterceptor = (request) => {
  if (request.url.startsWith(versionsUrl)) {
    request.baseURL = process.env.API_BASE_ADMIN_URL;
  }

  request.url = `${request.baseURL}${request.url}`;

  return request;
};
