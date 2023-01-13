import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout";
import { API } from "../api/api";
import { useMutation } from "react-query";
import RP from "rupiah-format";
import Button from "../../components/button";
import { Success, Error } from "../../helper/toast";

export default function Product() {
  const [product, setProduct] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const id = router.query.product;

  const getProduct = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  const addOrder = useMutation(async ({ id, price }) => {
    const auth = await API.get("/check-auth", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    setLoading(true);
    try {
      await API.post("cart", {
        user_id: auth.data.data.id,
        qty: 1,
        sub_total: 0,
        status: "pending",
      });

      const order = {
        product_id: id,
        sub_amount: price,
      };
      await API.post("/order", order);
      Success({ message: "Order Added" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  return (
    <Layout pageTitle='Detail Product'>
      <div className='md:grid grid-cols-2 my-10 mx-10'>
        <img
          src={product?.image}
          alt='product'
          className='w-[25rem] h-[25rem] '
        />
        <div className='my-6'>
          <h1 className='md:text-5xl font-bold my-3'>{product?.title}</h1>
          <h1 className='my-3'>Brand: {product?.brand}</h1>
          <h1 className='md"text-2xl font-semibold my-3S'>
            {RP.convert(product?.price)}
          </h1>
        </div>
        <div className='grid col-span-2 justify-items-center'>
          <Button
            name={loading ? "loading" : "Add to cart"}
            onClick={() =>
              addOrder.mutate({ id: product?.id, price: product?.price })
            }
            className='bg-btn text-white rounded-lg py-2 px-6 my-5 hover:bg-main/70 active:bg-main '
          />
        </div>
      </div>
    </Layout>
  );
}
