import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from './components/Error';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from "./components/HomePage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/*" element={<Error />}/>

    </Routes>
  </BrowserRouter>
  );
}

export default App;

