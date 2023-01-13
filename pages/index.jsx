import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import { UserContext } from "../context/userContext";
import { API } from "./api/api";
import RP from "rupiah-format";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useContext(UserContext);
  const [product, setProduct] = useState();

  const [showLogin, setShowLogin] = useState(false);
  const loginFirst = () => setShowLogin(true);

  useEffect(() => {
    const getShops = async (e) => {
      try {
        const response = await API.get("/products");
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getShops();
  }, []);

  return (
    <Layout pageTitle='Home' showLogin={showLogin} setShowLogin={setShowLogin}>
      <div className='container max-w-6xl'>
        <div className='grid md:grid-cols-2 md:gap-2 grid-cols-2 gap-1 my-8'>
          {product?.map((item) => (
            <div
              key={item.id}
              onClick={
                !auth.isLogin
                  ? loginFirst
                  : () => router.push(`/product/${item.id}`)
              }
              className='flex p-5 bg-white rounded-lg border
              border-gray-200 shadow-md hover:bg-main/50 active:bg-main/70
              cursor-pointer'>
              <img
                src={item.image}
                alt='product'
                className='w-[14rem] h-[14rem] rounded-full object-cover object-center'
              />
              <div className='block my-auto'>
                <h1 className='mb-2 md:text-2xl font-bold tracking-tight text-gray-900 mx-3 flex items-center'>
                  {item.title}
                </h1>
                <h1 className='mb-2 md:text-xl text-gray-900 mx-3 flex items-center'>
                  {RP.convert(item.price)}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
