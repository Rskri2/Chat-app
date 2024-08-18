import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HomePage from "./components/HomePage";
import Page from "./components/Page";
import ProtectedRoute from "./ProtectedRoute";
import ChatLayout  from "./components/auth/ChatLayout"
import ChatHome from "./components/auth/ChatHome";
import {Result }from 'antd'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage>{<Page />}</HomePage>} />
        <Route path="/login" element={<HomePage>{<Login />}</HomePage>} />
        <Route
          path="/register"
          element={<HomePage>{<Register />}</HomePage>}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-account" element={
            <ChatHome />
          } />
          <Route path="/my-account/:id" element={<ChatLayout />} />
        </Route>

        <Route
          path="/*"
          element={   <HomePage>
            {
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
              />
            }
          </HomePage>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
