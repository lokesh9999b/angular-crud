import { Request, Response } from "express";

export const searchUniversities = async (req:Request, res:Response): Promise<any> =>{
    try{
        const {name} = req.query;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({message: 'University name is required'});
        }
        
        const apiURL = `http://universities.hipolabs.com/search?name=${encodeURIComponent(name)}`;
        const response = await fetch(apiURL);  

        if(!response.ok){
            return res.status(502).json({message: 'Unable to fetch from external API'});
        }
        
        const universities = await response.json();

        const trimmed = universities.slice(0,10).map((u: any)=> ({
            name: u.name,
            country: u.country,
            website: u.web_page?.[0] || null,
        }));

        return res.status(200).json(trimmed);
    } catch (error){
        console.log('Error searching universities:', error);
        return res.status(500).json({message: 'Internal Server error'});
    }
}