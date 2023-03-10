import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Input from "../components/input";
import Layout from "../components/layout";
import { Info, Warning } from "../helper/toast";
import { API } from "./api/api";

export default function EditProfile() {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({
    fullname: "",
    image: "",
    email: "",
    phone: "",
  });

  const router = useRouter();

  const [previewName, setPreviewName] = useState("");

  const handleChange = (e) => {
    setProfile({
      ...profile,

      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      setPreviewName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    const getData = async (e) => {
      try {
        const response = await API.get(`/check-auth`);

        setProfile({
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          phone: response.data.data.phone,
          image: response.data.data.image,
          location: response.data.data.location,
        });
      } catch (error) {
        console.log("errrorr", error);
      }
    };
    getData();
  }, [setData]);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("fullname", profile.fullname);
      formData.set("email", profile.email);
      formData.set("phone", profile.phone);
      formData.set("location", profile.location);
      if (previewName) {
        formData.set("image", profile?.image[0], profile?.image[0]?.name);
      }

      await API.patch("/user", formData);
      Info({ message: "Profile Updated" });
      router.push("/profile");
    } catch (error) {
      console.log(error);
      Warning({ message: "Failed To Update Profile" });
    }
  });

  return (
    <Layout pageTitle='Edit Profile'>
      <div className='container max-w-6xl'>
        <h1 className='font-bold text-3xl md:mt-20 mt-5 mb-10 font-mainFont'>
          Edit Profile
        </h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className='grid md:grid-cols-12 md:gap-4'>
            <div className='md:col-span-9'>
              <Input
                placeholder='Full name'
                type='text'
                name='fullname'
                value={profile.fullname}
                onChange={handleChange}
              />
            </div>
            <div className='md:col-span-3 grid content-center'>
              <input
                type='file'
                id='image'
                hidden
                name='image'
                onChange={handleChange}
              />
              <label
                htmlFor='image'
                className='w-full p-2 grid grid-cols-2 bg-auth bg-opacity-25 rounded-lg border-2 border-gray-400/70'>
                <div>
                  {previewName === ""
                    ? "Attach Image"
                    : previewName.slice(0, 10)}
                  ...
                </div>
                <div className='grid justify-end'>
                  <img src='/pin.svg' width={15} />
                </div>
              </label>
            </div>
          </div>
          <Input
            placeholder='Email'
            type='email'
            name='email'
            value={profile.email}
            onChange={handleChange}
          />
          <Input
            placeholder='Phone'
            type='number'
            name='phone'
            value={profile.phone}
            onChange={handleChange}
          />
          <div className='flex justify-end'>
            <button
              type='submit'
              className='md:w-1/5 w-20 py-1 bg-btn text-white my-3 rounded-lg text-center hover:bg-main/70 active:bg-main'>
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
