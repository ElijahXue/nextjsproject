import { NextPage } from "next";
import {useRouter}  from "next/router";



const Order: NextPage = () => {
    const router  =   useRouter();
    const{ orderid, id } = router.query;

    return <div>Orderid {orderid}, customerid {id}</div>;
};

export default Order;