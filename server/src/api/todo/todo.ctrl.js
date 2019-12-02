import Todo from 'model/todo';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.send(todos);
    } catch (e) {
        console.error(e.message);
    }
};
