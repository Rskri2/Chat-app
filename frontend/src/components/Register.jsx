import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./redux/users/registerReducer";
import { Link } from "react-router-dom";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [role, setrole] = useState("Student");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleLogin, setvisibleLogin] = useState(0);
  const { loading, error, user } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({ firstName, lastName, email, password, passwordConfirm })
    );
  };
  const handleClick = () => {
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
  };
  useEffect(() => {
    if (user) {
      setvisibleLogin(2);
    } else if (error) setvisibleLogin(1);
    setTimeout(() => {
      setvisibleLogin(0);
    }, 5000);
  }, [error, user]);
  return (
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12  pl-20 pt-20">
        <section className="relative flex  items-center justify-center bg-yellow-50 lg:col-span-5  xl:col-span-5 h mb-10" >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" to="/">
              <span className="sr-only">Home</span>
              {/* <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg> */}
              
            </Link>

            <h2 className="mt-44 text-2xl font-bold text-black sm:text-3xl md:text-4xl text-center">
              Welcome to EduTrack
            </h2>

              <div className=" max-w-xl text-center mt-4 leading-relaxed text-white/90 ">
                EduTrack is committed to supporting the educational community.
                Sign up today to take control of your learning experience,
                enhance your teaching methods, or manage your educational
                organization.
              </div>
          </div>
        </section>

        <main className="flex items-center justify-center lg:col-span-7   xl:col-span-6 mb-10 bg-white">
          <div className="flex flex-col items-center w-full h-5/6">
            {visibleLogin === 1 ? (
              <ErrorAlert error={error} visibleLogin={visibleLogin} />
            ) : visibleLogin === 2 ? (
              <SuccessAlert
                message={"Account created successfully"}
                visibleLogin={visibleLogin}
              />
            ) : null}
            <div className="flex items-center justify-center  py-2 sm:px-12 lg:col-span-7  lg:py-6 xl:col-span-6 absolute top-20  w-5/12 h-5/6 ">
              <div className="max-w-md lg:max-w-3xl flex items-center flex-col ">
                <Link className="block text-blue-600" to="/">
                  <span className="sr-only">Home</span>
                  {/* <svg
                     className="h-8 sm:h-10"
                     viewBox="0 0 28 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     >
                     <path
                       d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                       fill="currentColor"
                       />
                   </svg> */}
                </Link>

                <div className="mt-6 text-sm font-bold flex justify-center text-gray-900 sm:text-2xl md:text-4xl">
                Welcome to EduTrack
                </div>

                <div className="mt-4 text-xl leading-relaxed flex justify-center text-gray-500">
                  Are you ready to join EduTrack?
                </div>

                <form
                  action="#"
                  className="mt-8 grid grid-cols-6 gap-6"
                  onSubmit={handleLogin}
                >
                  <div className="col-span-6 sm:col-span-3 ">
                    <label
                      htmlFor="FirstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>

                    <input
                      type="text"
                      id="FirstName"
                      name="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>

                    <input
                      type="text"
                      id="LastName"
                      name="last_name"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-900"
                    >
                      
                      Email
                    </label>

                    <input
                      type="email"
                      id="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-6"
                    />
                  </div>
                  <div className="relative col-span-3">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                      <div className="border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-700">
                        {role}
                      </div>
                      <button
                        className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 "
                        onClick={handleClick}
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
                    {menuOpen && (
                      <div
                        className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          <div
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                            onClick={() => setrole("teacher")}
                          >
                            Teacher
                          </div>

                          <div
                            onClick={() => setrole("Student")}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                          >
                            Student
                          </div>

                          <div
                            onClick={() => setrole("Admin")}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                          >
                            Admin
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      
                      Password
                    </label>
                    <input
                      type="password"
                      id="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
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
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-6"
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
                        I want to receive emails about events and product
                        updates
                      </span>
                    </label>
                  </div>

                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      By creating an account, you agree to our
                      <a className="text-gray-700 "> terms and conditions </a>
                      and
                      <a className="text-gray-700 ">privacy policy</a>.
                    </p>
                  </div>

                  {/* <div className="col-span-6 mx-44 sm:flex sm:items-center sm:gap-4">
                    <button
                      type="submit"
                      className="py-2.5 rounded-md px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-white dark:hover:bg-gray-700 w-full"
                    >
                      {!loading ? "Create an account" : "Creating account"}
                    </button>
                  </div>
                  <div className="col-span-6 w-full flex items-center">
                    <div className="mt-4 text-sm text-gray-500 sm:mt-0 w-full text-center">
                      Already have an account?
                      <Link to="/login" className="text-gray-700 underline">
                        Log in
                      </Link>
                      .
                    </div>
                  </div> */}
                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
  className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-gray-500"
>
{!loading ? "Create an account" : "Creating account"}
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to="/login" className="text-gray-700 underline">
                        Log in
                      </Link>
            </p>
          </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
