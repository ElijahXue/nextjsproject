import { NextPage } from "next";

import { useRouter } from "next/router";


const Customer: NextPage = () => {
    const router = useRouter();
    // console.log(router.query.id)
    const id = router.query;
    // console.log(id)
    return <div>Customer</div>;
};

export default Customer;