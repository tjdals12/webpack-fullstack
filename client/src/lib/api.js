import axios from 'axios';

export const getTodos = () => axios.get('/api/todos');
