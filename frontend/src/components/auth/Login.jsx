import { useState ,useEffect} from "react";
import {  message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  loginUser } from "../redux/authReducer";
import { Spinner } from "@material-tailwind/react";
import {Result } from 'antd'
import { Link ,useNavigate} from "react-router-dom";
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
    navigate("/account-info");
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

      <div className=" lg:grid lg:min-h-screen lg:grid-cols-12  pl-20 pt-24 w-full">
        <section className="relative flex bg-white lg:col-span-5  xl:col-span-5 items-center justify-self-center min-h-screen">

          <img
            alt=""
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" to="/">
              <span className="sr-only">Home</span>
            </Link>

            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl font-sans text-black text-center place-content-center mt-44">
              Welcome to EduTrack
            </h2>
            <div className="mt-4 max-w-xl leading-relaxed  text-center text-white">
              EduTrack is committed to supporting the educational community.
              Sign up today to take control of your learning experience, enhance
              your teaching methods, or manage your educational organization.
            </div>
          </div>
        </section>
        <main className=" flex items-center justify-center lg:col-span-7  xl:col-span-6 ">
          <div className=" flex items-center justify-center lg:col-span-7 l xl:col-span-6 absolute top-28  w-3/12">
            <div className="w-full">
          
              <Link className="block text-black" to="/">
                <span className="sr-only">Home</span>
                <div className="flex justify-center">
                </div>
              </Link>
              <div className="text-2xl font-bold flex justify-center text-gray-900 sm:text-3xl md:text-4xl mt-[100px]">
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
                  {/* <div className="col-span-6 sm:flex sm:items-center sm:gap-04">
                  <button onClick={handleGoogleLogin} className="flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full text-center">
                      <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"  width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">  <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                      Continue with Google
                  </button>
                </div> */}
            </div>
          </div>
        </main>
      </div>
    )
  }
    </>
  );
}
