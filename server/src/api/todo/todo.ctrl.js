import Todo from 'model/todo';
import logger from 'logger';

export const getTodos = async (req, res) => {
    logger.info(`${req.originalUrl}: request`);

    try {
        const todos = await Todo.find();

        res.status(200).send(todos);
        logger.info(`${req.originalUrl}: success`);
    } catch (e) {
        logger.error(`${req.originalUrl}: ${e.message}`);
        res.status(500);
    }
};

export const getTodo = async (req, res) => {
    logger.info(`${req.originalUrl}: request`);
    const { id } = req.params;

    try {
        const todo = await Todo.findOne({ _id: id });

        res.status(200).send(todo);
        logger.info(`${req.originalUrl}: success`);
    } catch (e) {
        logger.error(`${req.originalUrl}: ${e.message}`);
        res.status(500);
    }
};
