import csvToJson from 'csvtojson';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    const csvFilePath = path.join(process.cwd(), 'public', 'colleges.csv');
    const jsonArray = await csvToJson().fromFile(csvFilePath);

    const { country, city, type } = req.query;

    console.log(jsonArray);

    // Filter colleges based on query parameters
    const filteredColleges = jsonArray.filter((college) => {
      if (country && college.country !== country) {
        return false;
      }
      if (city && college.city !== city) {
        return false;
      }
      if (type && college.type !== type) {
        return false;
      }
      return true;
    });

    res.status(200).json(filteredColleges);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}