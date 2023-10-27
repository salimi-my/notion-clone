import { httpRouter } from 'convex/server';
import { getByIdAction } from './documents';

const http = httpRouter();

http.route({
  path: '/getByIdAction',
  method: 'GET',
  handler: getByIdAction
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
