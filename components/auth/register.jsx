import { useState } from "react";
import Button from "../button";
import Input from "../input";
import { useMutation } from "react-query";
import { API } from "../../pages/api/api";
import { Success, Error } from "../../helper/toast";

export default function Register() {
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const response = await API.post("/register", form);
      Success({ message: "Success Register" });
      setLoading(false);
    } catch (error) {
      Error({ message: "Failed Register" });
      setLoading(false);
    }
  });

  return (
    <form onSubmit={(e) => handleSubmit.mutate(e)}>
      <h3 className='mb-4 text-5xl font-medium text-main '>Register</h3>
      <Input
        placeholder='Email'
        type='email'
        name='email'
        onChange={handleChange}
      />
      <Input
        placeholder='Password'
        type='password'
        name='password'
        onChange={handleChange}
      />
      <Input
        placeholder='Fullname'
        type='text'
        name='fullname'
        onChange={handleChange}
      />
      <Input
        placeholder='Gender'
        type='text'
        name='gender'
        onChange={handleChange}
      />
      <Input
        placeholder='Phone'
        type='number'
        name='phone'
        onChange={handleChange}
      />
      <Button
        name={loading ? "loading" : "Register"}
        type='submit'
        className='w-full bg-btn text-white rounded-lg py-2 my-5 hover:bg-main/70 active:bg-main/70'
      />
    </form>
  );
}
