import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { Customer } from "./index";
import axios, { AxiosError } from "axios";
import { MongoClient } from "mongodb";
import { ServerApiVersion } from "mongodb";
type Props = {
    customer?: Customer;
}

interface Params extends ParsedUrlQuery {
    id: string

}
// const uri = "mongodb+srv://xue:<password>@xue.hjvsy80.mongodb.net/?retryWrites=true&w=majority";
// const {  ServerApiVersion } = require('mongodb');
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });


export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const uri = "mongodb+srv://xue:123@xue.hjvsy80.mongodb.net/Customers?retryWrites=true&w=majority";

    const mongoClient = new MongoClient(uri);
    const data = await mongoClient.db()
        .collection("Customers")
        .find()
        .toArray();

    console.log("!!!!!", data);

    // request for the data - >api
    const params = context.params!;
    try {
        const result = await axios.get<{ customer: Customer }>(`http://127.0.0.1:8000/api/customers/${context?.params?.id}`)
        // console.log("result", result)
        return {
            props: {
                customer: result.data.customer
            },
            revalidate: 60,
        }
    } catch (err) {
        if (err instanceof AxiosError) {
            return {
                notFound: true,
                revalidate: 60,
            }
        }
        return {
            props: {},
        }

    }
}





export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch or define the list of customer ids

    // const result = await axios.get(`http://127.0.0.1:8000/api/customers/`)
    // console.log("all path ", result);
    // const path = result.data.customers.map((customer: Customer) => {
    //     return { params: { id: customer.id.toString() } }
    // })

    return {
        paths: [],
        fallback: true,// or true or 'blocking' depending on your requirement
    };
};


const Customer: NextPage<Props> = (props) => {
    const router = useRouter();
    // console.log(router.query.id)
    if (router.isFallback) {

        return <p>Loading..</p>
    }
    const { id } = router.query;
    console.log(id)
    return <h1>Customer {props.customer ? props.customer.name : null} </h1>;
};

export default Customer;




////


// const uri = "mongodb+srv://xue:<password>@xue.hjvsy80.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
