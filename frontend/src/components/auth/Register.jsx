import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  message } from "antd";
import { registerUser } from "../redux/authReducer";
import { Link ,useNavigate} from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [role, setrole] = useState("Admin");
  const [menuOpen, setMenuOpen] = useState(false);
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
    console.log(res)
    if(res.success){
      setvisibleLogin(1);
      
  }
    else{
      message.error(res.error);
    }
    
  };
  const handleClick = () => {
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
  };
  useEffect(() => {
    if(visibleLogin === 1){
      navigate("/dashboard")
    }
  }, [visibleLogin]); 
  return (
    <div className="lg:grid min-h-screen lg:min-h-screen lg:grid-cols-12  pl-20 pt-20 relative">
      <section className="relative bg-white flex lg:col-span-5  xl:col-span-5 items-center justify-self-center min-h-screen">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="hidden lg:relative lg:block lg:p-12">
          <Link className="block text-white" to="/">
            <span className="sr-only">Home</span>
          </Link>

          <h2 className="mt-56 text-2xl font-bold text-black sm:text-3xl md:text-4xl text-center">
            Welcome to EduTrack
          </h2>

          <div className=" max-w-xl text-center mt-4 leading-relaxed text-white/90 ">
            EduTrack is committed to supporting the educational community. Sign
            up today to take control of your learning experience, enhance your
            teaching methods, or manage your educational organization.
          </div>
        </div>
      </section>

      <main className="flex items-center justify-center lg:col-span-7 xl:col-span-6 bg-white w-full min-h-screen">
          <div className="flex items-center justify-center  py-2 sm:px-12 lg:col-span-7  lg:py-6 xl:col-span-6 absolute top-20  w-4/12 ">
            <div className="max-w-md lg:max-w-3xl flex items-center flex-col ">
              <Link className="block text-blue-600" to="/">
                <span className="sr-only">Home</span>
              </Link>

              <div className="text-sm font-bold flex justify-center text-gray-900 sm:text-2xl md:text-4xl">
                Welcome to EduTrack
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
                    htmlFor="Role"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Role
                  </label>

          
                  <div className="inline-flex items-center overflow-hidden rounded-md border bg-white hover:cursor-pointer w-full "onClick={handleClick}>                      
                    <div className="border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-700 w-4/5">
                      {role}
                    </div>
                    <button
                      className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 w-1/5"
                      
                      >
                      <span className="sr-only">Menu</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                     
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

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm h-6"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about events and product updates
                    </span>
                  </label>
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
      </div>

  );
}
