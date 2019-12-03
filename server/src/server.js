import { connect } from 'model';
import app from 'app';
import config from 'config';
import logger from 'logger';

const { port, appHost } = config;

connect().then(type => {
    logger.info(`Connected ${type}`);

    app.listen(port, appHost, () => {
        logger.info(`Server running at localhost:${port}`);
    });
});
