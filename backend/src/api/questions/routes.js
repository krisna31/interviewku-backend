const InvariantError = require('../../exceptions/InvariantError');
const { WithTokenRequestSchema } = require('../../validator/general/schema');
const { GetQuestionsResponseSchema } = require('../../validator/questions/schema');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/questions',
    options: {
      handler: (request, h) => handler.getQuestions(request, h),
      auth: 'interviewku_jwt',
      validate: {
        headers: WithTokenRequestSchema,
        failAction: (request, h, error) => {
          throw new InvariantError(error.message);
        },
      },
      tags: ['api'],
      response: { schema: GetQuestionsResponseSchema },
    },
  },
];

module.exports = routes;
