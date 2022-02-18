import { Router } from "express";
import {TaskTimeRecord} from "../records/task.record";
import { ValidationError } from "../utils/errors";
import * as TimeFormat from 'hh-mm-ss';

export const jsonRouter = Router();

export type ObjectToSumarizeTypeNumber = {[key: string]: number};
export type ObjectToSumarizeTypeString = {[key: string]: string};

jsonRouter
    .get('/', async (req, res)=>{
        const timeOfTasks = await TaskTimeRecord.listAll();
        const objectToSumarize: ObjectToSumarizeTypeNumber = {};
        const objectWithLastResult: ObjectToSumarizeTypeString = {};
        timeOfTasks.map((task)=> {
            if (task.endTime !== null || task.timeOfTask !== null) {
                const theDate: string = new Date(task.endTime).toISOString().split('T')[0];
                if (objectToSumarize.hasOwnProperty(`${theDate}`)) {
                    return objectToSumarize[`${theDate}`] += Number(TimeFormat.toS(task.timeOfTask));
                }

                return objectToSumarize[`${theDate}`] = Number(TimeFormat.toS(task.timeOfTask));
            }
        })

        if (Object.keys(objectToSumarize).length !== 0) {
            for (const objectToSumarizeKey in objectToSumarize) {
                objectWithLastResult[objectToSumarizeKey] = TimeFormat.fromS(objectToSumarize[objectToSumarizeKey]);

            }

            res.json(objectWithLastResult);
        } else {
            throw new ValidationError("Nie masz żadnych zadań, lub wystąpił inny błąd. Dodaj lub zamknij choć jedno zadanie lub spróbuj ponownie za kilka minut.");
        }
    })
