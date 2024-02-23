const express = require('express');
const List = require('../models/list');

const app = express();

app.use(express.json());

app.post('/todolist', async (req, res) => {
    const { id, currentUserID, taskInput, checkbox } = req.body;

    try {
        const newTask = new List({id: id, writer: currentUserID, body: taskInput, done: checkbox});
        await newTask.save();
        res.json({ message: '할 일 목록에 추가되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

app.post('/updateCheckbox', async (req, res) => {
    const { currentUserID, taskInput, isChecked } = req.body;

    try {
        const updatedTask = await List.findOneAndUpdate(
            { writer: currentUserID, body: taskInput },
            { done: isChecked },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: '업데이트할 할 일 항목이 없습니다.' });
        }

        res.json({ message: '체크박스 상태가 업데이트되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

app.post('/deleteTask', async (req, res) => {
    const { currentUserID, taskInput } = req.body;

    try {
        const deletedTask = await List.findOneAndDelete({
            writer: currentUserID,
            body: taskInput
        });

        if (!deletedTask) {
            return res.status(404).json({ error: '삭제할 할 일 항목이 없습니다.' });
        }

        res.json({ message: '할 일 항목이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

app.post('/getTasks', async (req, res) => {
    const { currentUserID } = req.body;

    try {
        const userTasks = await List.find({ writer: currentUserID });

        const formattedTasks = userTasks.map(task => ({
            writer: currentUserID,
            body: task.body,
            done: task.done,
        }));

        res.json({ userTasks: formattedTasks });
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = app;