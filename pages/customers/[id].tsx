import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { Customer } from "./index";
import axios, { AxiosError } from "axios";

type Props = {
    customer?: Customer;
}

interface Params extends ParsedUrlQuery {
    id: string

}


export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {

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