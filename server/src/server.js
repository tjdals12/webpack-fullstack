import { connect } from 'model';
import app from 'app';
import config from 'config';
import logger from 'logger';

const { port } = config;

connect().then(type => {
    logger.info(`Connected ${type}`);

    app.listen(port, () => {
        logger.info(`Server running at localhost:${port}`);
    });
});
