import {
  Card,
} from "@material-tailwind/react";
import {SaveOutlined} from '@ant-design/icons';
import { message } from "antd";
import { Button } from 'antd';
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {  updateUser } from "../redux/authReducer";
export default function AccountInfo() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  message.config({
    duration: 2,
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateUser({ name, email}));
    if(res.success){
      message.success("Edited details successfully")
    }
    else{
      message.error(res.error)
    }
  };
  useEffect(() => {
    const name = window.localStorage.getItem("name");
    const email = window.localStorage.getItem("email");
    setname(name);
    setemail(email);
  }, []); 
  return (
    <div className="flex items-center justify-center">
        <Card
          color="transparent"
          shadow={false}
          className="h-full w-1/3 "
        >
    <div className=" max-w-xl text-center mt-4 leading-relaxed ">
        Account Settings
          </div>
    <form
         onSubmit={handleUpdate}       
                className="mt-8 flex flex-col"
              >
                <div className="col-span-6 ">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                  Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                  />
                </div>
                <div className=" sm:flex sm:items-center flex justify-end 
                flex-col sm:gap-4">
                <Button type="primary " htmlType="submit" className="mt-10">
                  <SaveOutlined/>
                  Save Changes
                    </Button>
                </div>
                
              </form>
        </Card>
    </div>
  );
}