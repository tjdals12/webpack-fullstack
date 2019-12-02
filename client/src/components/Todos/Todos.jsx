import React, { useEffect } from 'react';
import useTodos from 'hooks/todo/useTodos';

export default function Todos() {
    const { todos, getTodos } = useTodos();

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <ul>
            {todos.map(({ _id, text, isDone }) => (
                <li key={_id}>
                    {text}
                    {isDone && 'X'}
                </li>
            ))}
        </ul>
    );
}
