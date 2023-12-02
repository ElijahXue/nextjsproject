import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { Customer } from "./index";
import axios, { AxiosError } from "axios";
import { BSONType, MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { ServerApiVersion } from "mongodb";
import { BSONError } from 'bson'
import { getCustomer } from "../api/customers/[id]";
type Props = {
    customer?: Customer;
}

interface Params extends ParsedUrlQuery {
    id: string
}



export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

    const params = context.params!;

    try {
        // const mongoClient = await clientPromise;
        // const data = await mongoClient.db()
        //     .collection("Customers")
        //     .findOne({ "_id": new ObjectId(params.id) }) as Customer

        const data = await getCustomer(params.id as string);

        console.log("!!data!!", data)
        if (!data) {
            return {
                notFound: true,
                revalidate: 60
            };
        }
        return {
            props: {
                customer: JSON.parse(JSON.stringify(data))
            },
            revalidate: 60,
        }
    } catch (err) {

        // print()
        console.log("print err", err);
        // if (err instanceof BSONError) {

        //     return {
        //         notFound: true,
        //     }
        // }
        // return {
        //     props: {},
        // }
        throw err;

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
    return <h1> {props.customer ? ("Customer  " + props.customer.name) : null} </h1>;
};

export default Customer;



