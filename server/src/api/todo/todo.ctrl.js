import Todo from 'model/todo';

export const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.status(200).send(todos);
};

export const getTodo = async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id });
    res.send(todo);
};
