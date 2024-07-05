import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from './components/Error';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from "./components/HomePage";
import Page from "./components/Page";
// import ResetPassword from "./components/ResetPassword";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomePage element="home" >{<Page/>}</HomePage>}/>
      <Route path="/register" element={<HomePage element="register" >{<Register/>}</HomePage>}/>
      <Route path="/login" element={<HomePage element="login" >{<Login/>}</HomePage>}/>
      <Route path="/*" element={<HomePage element="err" >{<Error/>}</HomePage>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

