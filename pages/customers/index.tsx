import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import axios from 'axios';
export type Customer = {
    id: number,
    name: string,
    industry: string
}
type Order = {
    id: number,
    description: string,
    totalInCents: number
}

type GetCustomerReponse = {
    customers: Customer[]
}

export const getStaticProps: GetStaticProps = (async (context) => {
    // const posts = await res.json();
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    const result = await axios.get<{
        customers: Customer[]
    }>("http://127.0.0.1:8000/api/customers/");
    console.log("result", result)

    return {
        props: {
            customers: result.data.customers,
        },
        revalidate: 20,


    }

}
)

const Customers: NextPage = ({ customers }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log("prop", customers);
    return (<div>
        <h1>
            Customer 123
        </h1>
        {customers.map((customer: Customer) => {
            return (
                <div key={customer.id}>
                    <p>    {customer.name}</p>
                    <p>    {customer.id}</p>
                    <p>    {customer.industry}</p>
                </div>
            )

        })}

    </div>);
};

export default Customers;