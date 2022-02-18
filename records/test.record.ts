import {Request, request, Response} from "express";

let req = {
    url: `http://localhost:3000/config`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

request(req, function(err: Error, res: Response){
    console.log(res)
}) as Request;

