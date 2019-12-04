import axios from 'axios';

const prefixPath = '/api/v1';

export const getTodos = () => axios.get(`${prefixPath}/todos`);
