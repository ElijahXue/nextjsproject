import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
type Customer = {
    id: number,
    name: string,
    industry: string
}

export const getStaticProps: GetStaticProps = (async (context) => {
    // const posts = await res.json();
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            customers: [
                {
                    id: 1,
                    name: "xue",
                    industry: "papa"
                },
                {
                    id: 2,
                    name: "Wu",
                    industry: "Mama"
                },
            ] as Customer[],
        },
    }

}
)

const Customers: NextPage = ({ customers }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log("prop", customers);
    return (<div>
        <h1>
            Customer
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