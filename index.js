const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/todos', async(req, res) => {
    try{
        const { DESCRIPTION } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (DESCRIPTION) VALUES($1) RETURNING *',[DESCRIPTION]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/todos', async(req, res) => {
    try{
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/todos/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


app.put('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const { DESCRIPTION } = req.body;
        const updateTodo = await pool.query('UPDATE todo SET DESCRIPTION = $1 WHERE todo_id = $2',[DESCRIPTION, id]);
        res.json('Updated!')
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/todos/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        res.json('DELETED!')
        
    } catch (err) {
        console.error(err.message);
    }
});








app.listen(5000, () => {
    console.log('server has started on port 5000');
});