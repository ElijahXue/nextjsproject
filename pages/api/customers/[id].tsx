

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Customer } from "../../customers";

//nextjs api route
export const getCustomer = async (id: string | ObjectId): Promise<Customer> => {
    id = typeof id === 'string' ? new ObjectId(id) : id;
    const mongoClient = await clientPromise;
    const data = (await mongoClient
        .db()
        .collection('Customers')
        .findOne({ _id: id })) as Customer

    return data;
}


type Messageresponse = {
    message: string
}

export default async (req: NextApiRequest, res: NextApiResponse<{ customer: Customer } | Messageresponse>) => {
    try {
        const { id } = req.query;
        const data = await getCustomer(id as string);
        if (!data) {
            // If no data is found, respond with a 404 status
            return res.status(404).json({ message: 'Customer not found' });
        }
        console.log("dataaaaa", data);
        res.status(200).json({ customer: data });
    } catch (error) {
        console.error("Error occurred: ", error);
        // Respond with a 404 status
        res.status(404).json({ message: 'An error occurred' });
    }
}