const express = require('express');
const path = require('path');

const {mongoDB} = require('./server/config/db');
const saveUser = require('./server/controllers/register');
const loginUser = require('./server/controllers/login');
const addTodo = require('./server/controllers/todolist')
const checkcheck = require('./server/controllers/todolist')
const deleteTask = require('./server/controllers/todolist')
const loadTask = require('./server/controllers/todolist')
const findUser_id = require('./server/config/ID_find')
const findUser_ps = require('./server/config/PS_find')
const changePassword = require('./server/controllers/change_ps')
const deleteAc = require('./server/controllers/delete.js')

const app = express();

mongoDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));

// POST 요청
app.post('/saveuser', (req, res) => saveUser(req, res));
app.post('/login', (req, res) => loginUser(req, res));
app.post('/logout', (req, res) => {res.clearCookie('user_id'); res.json({ message: '로그아웃 성공' });});
app.post('/todolist', (req, res) => addTodo(req, res));
app.post('/updateCheckbox', (req, res) => checkcheck(req, res));
app.post('/deleteTask', (req, res) => deleteTask(req, res));
app.post('/getTasks', (req, res) => loadTask(req, res));
app.post('/findId', (req, res) => findUser_id(req, res));
app.post('/findPs', (req, res) => findUser_ps(req, res));
app.post('/change', (req, res) => changePassword(req, res));
app.post('/delete', (req, res) => deleteAc(req, res));

// URL
app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'register.html'));
});
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'main.html'));
});
app.get('/find', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'findUser', 'findUser.html'));
});
app.get('/id', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'findUser', 'find_id.html'));
});
app.get('/email', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'findUser', 'find_ps.html'));
});
app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'account.html'));
});
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'fix_ps.html'));
});
app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'delete.html'));
});

app.listen(3000);