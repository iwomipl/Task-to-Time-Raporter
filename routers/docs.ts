import { Router } from "express";
import {TaskTimeRecord} from "../records/task.record";
import { ValidationError } from "../utils/errors";

export const docsRouter = Router();

docsRouter
    .get('/', async (req, res)=>{

        res.render('docs/docs', {
        });
    })