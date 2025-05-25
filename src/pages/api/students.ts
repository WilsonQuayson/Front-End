import { NextApiRequest, NextApiResponse } from "next";
import { Student } from "../../../types";

// pages/api/example.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const response = await fetch('https://localhost:7063/api/Students');
        if(response.ok){
            const data: Student[] = await response.json();
            res.status(200).json(data);
        }else{
            throw new Error("Failed to fetch data from backend")
        }
    } 
    else if (req.method === 'POST') {
        const body = req.body;
        const response = await fetch('https://localhost:7063/api/Students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data: Student = await response.json();
        res.status(201).json(data);
    }
    // Handle other CRUD operations as needed
}
