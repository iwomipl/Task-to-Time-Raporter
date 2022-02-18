import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import { pool } from "../utils/db";
import {FieldPacket} from "mysql2";
import * as TimeFormat from 'hh-mm-ss';

type TaskTimeRecordResults = [TaskTimeRecord[], FieldPacket[]];

export class TaskTimeRecord {
    public readonly id?: string;
    public readonly title: string;
    public status: number;
    public readonly startTime?: Date;
    public endTime?: Date;
    public timeOfTask?: string;

    constructor(obj: Omit<TaskTimeRecord, 'insert' | 'finishTask' | 'delete'>) {
        const {id, title, startTime, endTime, status, timeOfTask} = obj;
        if(title.length <3 || title.length >50){
            throw new ValidationError(`Nazwa zadania musi posiadać od 3 do 50 znaków. Aktualnie jest to ${title.length}.`);
        }

        this.id = id ?? uuid();
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.timeOfTask = timeOfTask;
    }

    async insert(): Promise<string>{
       await pool.execute("INSERT INTO `tasks`(`id`, `title`, `startTime`, `status`) VALUES (:id, :title, :startTime, :status)", {
           id: this.id,
           title: this.title,
           startTime: new Date(),
           status: 1,
       });
        return this.id;
    }

    async delete(): Promise<string>{
        if (!this.id) {
            throw new ValidationError('Niestety nie udało się usunąć zadania.');
        }
        await pool.execute('DELETE FROM `tasks` WHERE `id` = :id', {
            id: this.id,
        });
        return "Zadanie zostało usunięte.";
    }

    async finishTask(): Promise<string>{
        const taskFromDb = await TaskTimeRecord.getOne(this.id);
        const startTime = taskFromDb.startTime;
        if (taskFromDb.endTime){
            throw new ValidationError('Nie można jednego zadania zamknąć dwa razy.');
        }
        const endTime = new Date();
        const timeOfTask = new Date(endTime.getTime() - startTime.getTime()).toISOString().slice(11,19);

        await pool.execute('UPDATE `tasks` SET `endTime`=:endTime, `status`=:status, `timeOfTask`=:timeOfTask WHERE `id`=:id', {
            id: this.id,
            endTime,
            timeOfTask,
            status: 0,
        })
        return 'Zadanie zostało zamknięte.';
    }

    static async getOne(id: string): Promise<TaskTimeRecord | null>{
       const [results] = await pool.execute('SELECT * FROM `tasks` WHERE `id`=:id',{
            id,
        }) as TaskTimeRecordResults;

       return results.length === 0 ? null : results[0];
    }

    static async listAll(): Promise<TaskTimeRecord[]>{
        const [results] = await pool.execute('SELECT * FROM `tasks` ORDER BY `startTime` DESC') as TaskTimeRecordResults;

        return results.map(obj => new TaskTimeRecord(obj));
    }

    static async isTaskOpen(): Promise<boolean>{
        const results = await TaskTimeRecord.listAll();

        const isStatusOpen = results.reduce((prev, curr) => {
            return prev + Number(curr.status);
        }, 0);
        return Boolean(isStatusOpen);
    }

    static async calculateCumulatedTime(){
        const cumulatedTime = await TaskTimeRecord.listAll();

        const sumOfTimesMiliseconds = cumulatedTime.reduce((prev, curr): number | null => {
            if (!curr.timeOfTask){
                return null;
            }
            const tempTime = TimeFormat.toS(curr.timeOfTask);
            return prev + tempTime;
        }, 0);


        if (sumOfTimesMiliseconds !== null || Number.isNaN(sumOfTimesMiliseconds)) {
            const sumOfTimes = TimeFormat.fromS(sumOfTimesMiliseconds);
            return sumOfTimes;
        }
        return null;
    }
}