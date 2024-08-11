import { useState ,useEffect} from "react";
import {   message,Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  loginUser } from "../redux/authReducer";
import { Spinner } from "@material-tailwind/react";
import { useNavigate} from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [visibleLogin, setvisibleLogin] = useState(0);
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const dispatch = useDispatch();
  const { loadingLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  message.config({
    duration: 2,
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ email, password }));
    if(res.success)setvisibleLogin(1);
    
    else{
      message.error(res.error)
      }
  };
  useEffect(() => {
    if(window.localStorage.getItem("token"))setIsLogedIn(true);
    if(visibleLogin === 1){
    navigate("/account");
   }
  }, [visibleLogin]); // D
  return (
    <>
  {
    isLoggedIn ? (
        <Result
          status="403"
          title="403"
          subTitle="You are already logged in!!"
        />
    ) : (

      <main className="flex items-center justify-center lg:col-span-7 xl:col-span-6 bg-white w-full min-h-screen">
        <div className=" min-h-screen w-full flex items-center justify-center lg:col-span-7  xl:col-span-6  ">
          <div className=" flex items-center justify-center lg:col-span-7 l xl:col-span-6 absolute top-28  w-3/12">
            <div className="w-full">
          
              
              <div className="text-2xl font-bold flex justify-center text-gray-900 sm:text-3xl md:text-4xl pt-20">
                Welcome back
              </div> 

              <div className="mt-4 text-xl leading-relaxed flex justify-center text-gray-500">
                Please login to your account
              </div>

              <form
                className="mt-8 grid grid-cols-3 gap-3 "
                onSubmit={handleLogin}
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1  rounded-md  border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 w-full"
                  />
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 "

                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={password}
                    required
                    placeholder="••••••••"
                    onChange={(e) => setpassword(e.target.value)}
                    className="mt-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8 w-full "
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-gray-500 w-full" type="submit">
                   
                   { !loadingLogin && ('Log in')}
                   {loadingLogin && ( <Spinner className="h-5 w-full text-white justify-center" />)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
     </main>
    )
  }
    </>
  );
}
