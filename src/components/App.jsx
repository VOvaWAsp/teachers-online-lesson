import { Route, Routes } from "react-router-dom"
import HomePages from "../pages/HomePages/HomePages"
import TeachersPages from "../pages/TeachersPages/TeachersPages"
import FavoritesPages from "../pages/FavoritesPages/FavoritesPages"
import Header from "./Header/Header"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCatalog } from "../redux/Catalog/operations"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch])
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/teachers" element={<TeachersPages />} />
        <Route path="/favorites" element={<FavoritesPages />} />
      </Routes>
    </div>
  )
}

export default App
