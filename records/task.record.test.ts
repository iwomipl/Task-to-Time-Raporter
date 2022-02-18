import {TaskTimeRecord} from "./task.record";

let idToTest:string;
const title = 'newTitle';
const status = 1;

test('test getOneFunction good', async ()=>{
    const getOne = await JSON.stringify(await TaskTimeRecord.getOne('154c7ff8-91f4-4f86-b5ec-9d4ea3968283'))
    const myOne = "{\"id\":\"154c7ff8-91f4-4f86-b5ec-9d4ea3968283\",\"title\":\"kolejny raz\",\"startTime\":\"2022-02-18T08:16:08.000Z\",\"endTime\":\"2022-02-18T08:16:08.000Z\",\"status\":0,\"timeOfTask\":\"00:14:48\"}";
    expect(getOne).toBe(myOne);
});

test('test getOneFunction bad', async ()=>{
    const getOne = await JSON.stringify(await TaskTimeRecord.getOne('154c7ff8-91f4-4f86-b5ec-9d4ea3968283a'));
    expect(getOne).toBe("null");
});

test('test insert', async ()=>{
    const newTask = new TaskTimeRecord({
        title,
        status,
    })
    idToTest = await newTask.insert();
    const result = new TaskTimeRecord(await TaskTimeRecord.getOne(`${idToTest}`));
    expect(`${result.id}`).toBe(idToTest);
    expect(result.title).toBe(title);
    expect(result.status).toBe(status);
});

test('test finishTask', async()=>{
    const result = new TaskTimeRecord(await TaskTimeRecord.getOne(`${idToTest}`));
    const message = await result.finishTask();
    const nextResult = new TaskTimeRecord(await TaskTimeRecord.getOne(`${idToTest}`));
    expect(message).toBe('Zadanie zostało zamknięte.');
    expect(nextResult.status).toBe(0);
    expect(nextResult.timeOfTask).toBe('00:00:00');
});

test('test delete', async()=>{
    const result = new TaskTimeRecord(await TaskTimeRecord.getOne(`${idToTest}`));
    const message = await result.delete();
    const nextResult = await TaskTimeRecord.getOne(`${idToTest}`);
    expect(message).toBe("Zadanie zostało usunięte.");
    expect(nextResult).toBe(null);
});

test('test listAll', async()=>{
    const tasks: TaskTimeRecord[] = await TaskTimeRecord.listAll();
    const newTask = new TaskTimeRecord({
        title,
        status,
    })
    idToTest = await newTask.insert();
    const nextTasks: TaskTimeRecord[] = await TaskTimeRecord.listAll();
    const randomNumber = Math.floor(Math.random()*tasks.length);
    expect(nextTasks[randomNumber+1].id).toBe(tasks[randomNumber].id);
    expect(nextTasks[randomNumber+1].title).toBe(tasks[randomNumber].title);
    expect(nextTasks[randomNumber+1].status).toBe(tasks[randomNumber].status);
    expect(nextTasks[randomNumber+1].endTime).toStrictEqual(tasks[randomNumber].endTime);
    expect(nextTasks[randomNumber+1].timeOfTask).toBe(tasks[randomNumber].timeOfTask);

    expect(nextTasks[0].id).toBe(idToTest);
    expect(nextTasks[0].title).toBe(title);
    expect(nextTasks[0].status).toBe(status);
    expect(nextTasks[0].endTime).toBe(null);
    expect(nextTasks[0].timeOfTask).toBe(null);

    const filteredTasks = nextTasks.filter((nextTask, index) =>{
        return nextTasks[index].id !== (Boolean(tasks[index-1]) ? tasks[index-1].id : false);
    });
    const result = new TaskTimeRecord(await TaskTimeRecord.getOne(`${filteredTasks[0].id}`));
    await result.delete();
    const getOne = await JSON.stringify(await TaskTimeRecord.getOne(`${filteredTasks[0].id}`));
    expect(getOne).toBe("null");
});






