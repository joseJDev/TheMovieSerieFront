import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/layout/Header";
import DashBoard from "./components/Dashboard";
import MovieSerieDetail from "./components/MovieSerieDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./PrivateRoute";

function App() {  

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashBoard />}/>
            <Route path="/movie-serie/:id" element={<MovieSerieDetail />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
