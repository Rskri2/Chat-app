import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {  Button, message, Upload } from "antd";

import { registerUser } from "../redux/authReducer";
import { Link ,useNavigate} from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { UploadOutlined } from '@ant-design/icons';
const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  
  const [visibleLogin, setvisibleLogin] = useState(0);
  const { loadingReg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  message.config({
    duration: 2,
  });
const navigate = useNavigate();
  const handleLogin = async (e) => {

    e.preventDefault();
    const res = await dispatch( registerUser({ name, email, password, passwordConfirm }));
  
    if(res.success){
      setvisibleLogin(1);
      
  }
    else{
      message.error(res.error);
    }
    
  };

  useEffect(() => {
    if(visibleLogin === 1){
      navigate("/my-account")
    }
  }, [visibleLogin]); 
  return (
 

      <main className="flex items-center justify-center lg:col-span-7 xl:col-span-6 bg-white w-full min-h-screen ">
          <div className="flex items-center justify-center  py-2 sm:px-12 lg:col-span-7  lg:py-6 xl:col-span-6 absolute top-20  w-4/12 ">
            <div className="max-w-md lg:max-w-3xl flex items-center flex-col ">
            

              <div className="text-sm font-bold flex justify-center text-gray-900 sm:text-2xl md:text-4xl pt-16">
                Welcome to ChatApp
              </div>

              <div className="mt-4 text-xl leading-relaxed flex justify-center text-gray-500">
                Are you ready to join EduTrack?
              </div>

              <form
                
                className="mt-8 grid grid-cols-3 gap-3"
                onSubmit={handleLogin}
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
                    placeholder="Ram Kumar"
                    required
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
                    placeholder="ramkr@email.com"
                    required
                    onChange={(e) => setemail(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-9"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    value={passwordConfirm}
                    onChange={(e) => setpasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-600 shadow-sm h-9"
                  />
                </div>

              
                <div  className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

                </div>
                <div className="col-span-6">
                  <p className="text-sm text-gray-500 text-center">
                    By creating an account, you agree to our{" "}
                    <a className="text-gray-700 underline hover:no-underline hover:cursor-pointer"> terms and conditions </a>
                    and{" "}
                    <a className="text-gray-700 underline hover:no-underline hover:cursor-pointer">privacy policy</a>.
                  </p>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button type="submit" className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 w-full">
                   { !loadingReg && ('Create an account')}
                   {loadingReg && ( <Spinner className="h-5 w-full text-white justify-center" />)}
                  </button>
                </div>
                <div className="col-span-6 sm:flex sm:items-center text-center w-full">
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0 text-center w-full">
                    Already have an account?
                    <Link to="/login" className="text-gray-700 underline">
                      Log in
                    </Link>
                  </p>
                  </div>
              </form>
            </div>
          </div>
        </main>
  );
}
