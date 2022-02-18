import { Router } from "express";
import {TaskTimeRecord} from "../records/task.record";
import { ValidationError } from "../utils/errors";
import * as TimeFormat from 'hh-mm-ss';

export const homeRouter = Router();

homeRouter
    .get('/config', async (req, res)=>{
        res.json({"dupa": "pawiana"})
    })
    .get('/', async (req, res)=>{
        const fullList = await TaskTimeRecord.listAll();
        const sumOfTimes = await TaskTimeRecord.calculateCumulatedTime();

        res.render('home/home', {
            fullList,
            sumOfTimes,
        });
    })
    .get('/get-data/:id', async (req, res)=>{
        const id = req.params.id;
        const taskFromDb = await TaskTimeRecord.getOne(id);
        const startTime = taskFromDb.startTime;
        const endTime = new Date();
        const timeOfTask = new Date(endTime.getTime() - startTime.getTime()).toISOString().slice(11,19);
        res.json(timeOfTask);
    })
    .post('/', async (req, res)=>{
        if (await TaskTimeRecord.isTaskOpen()){
            throw new ValidationError(`Nie możemy dodać nowego zadania. Niestety nie masz zamkniętych wszystkich zadań.`);
        }

        const title: string = req.body.title;
        const newTask = new TaskTimeRecord({
            title: title,
            status: 1,
        });

        const id = await newTask.insert();
        const message = 'Zadanie zostało dodane, a pomiar czasu uruchomiony.';
        const fullList = await TaskTimeRecord.listAll();

        res.render('home/home', {
            fullList,
            message,
        });
    })
    .patch('/:id', async (req, res)=>{
        const {id} = req.params;
        const clickedTask = new TaskTimeRecord(await TaskTimeRecord.getOne(id));
        const message = await clickedTask.finishTask();

        const fullList = await TaskTimeRecord.listAll();

        res.render('home/home', {
            fullList,
            message,
        });
        return;
    })
    .delete('/:id', async (req, res)=>{
        const {id} = req.params;
        const clickedTask = new TaskTimeRecord(await TaskTimeRecord.getOne(id));
        const message = await clickedTask.delete();
        const fullList = await TaskTimeRecord.listAll();

        res.render('home/home', {
            fullList,
            message,
        });
        return;
    })