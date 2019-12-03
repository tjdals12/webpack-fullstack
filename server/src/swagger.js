import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerStats from 'swagger-stats';

const options = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'Example API',
            description: 'Express with webpack',
            version: '1.0.0',
        },
        host: 'localhost:4000',
        basePath: '/api/v1',
        schemes: ['http'],
    },
    apis: ['./src/api/**/*.spec.yaml'],
});

export const swaggerConfig = [
    '/swagger-api',
    swaggerUI.serve,
    swaggerUI.setup(options),
];

export const statsConfig = swaggerStats.getMiddleware({
    swaggerSpec: options,
    swaggerOnly: true,
});
