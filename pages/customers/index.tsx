import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import axios from 'axios';
import { MongoClient } from "mongodb";
import { ServerApiVersion, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
export type Customer = {
    _id: ObjectId,
    name: string,
    industry: string
}


type GetCustomerReponse = {
    customers: Customer[]
}

export const getStaticProps: GetStaticProps = (async (context) => {
    // const posts = await res.json();
    // By returning { props: { posts } }, the Blog component


    // const uri = "mongodb+srv://xue:123@xue.hjvsy80.mongodb.net/Customers?retryWrites=true&w=majority";
    // // const uri = "mongodb+srv://xue:123@xue.hjvsy80.mongodb.net/sample_mflix?retryWrites=true&w=majority";
    // const mongoClient = new MongoClient(uri);

    const mongoClient = await clientPromise;

    const data = await mongoClient.db()
        .collection("Customers")
        .find()
        .toArray();

    // console.log("!!!!!", data);

    // will receive `posts` as a prop at build time
    // const result = await axios.get<{
    //     customers: Customer[]
    // }>("http://127.0.0.1:8000/api/customers/");
    // // console.log("result", result)

    return {
        props: {
            customers: JSON.parse(JSON.stringify(data)),
        },
        revalidate: 20,


    }

}
)

const Customers: NextPage = ({ customers }: InferGetStaticPropsType<typeof getStaticProps>) => {
    // console.log("prop", customers);
    return (<div>
        <h1>
            Customer 123
        </h1>
        {customers.map((customer: Customer) => {
            return (
                <div key={customer._id.toString()}>
                    <p>    {customer.name}</p>
                    <p>    {customer._id.toString()}</p>
                    <p>    {customer.industry}</p>
                </div>
            )

        })}

    </div>);
};

export default Customers;