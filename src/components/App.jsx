import { Route, Routes } from "react-router-dom"
import Header from "./Header/Header"
import { useDispatch, useSelector } from "react-redux"
import { lazy, Suspense, useEffect } from "react"
import { fetchCatalog } from "../redux/Catalog/operations"

const HomePages = lazy(() => import("../pages/HomePages/HomePages"))
const TeachersPages = lazy(() => import("../pages/TeachersPages/TeachersPages"))
const FavoritesPages = lazy(() => import("../pages/FavoritesPages/FavoritesPages"))

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch])
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/teachers" element={<TeachersPages />} />
        <Route path="/favorites" element={<FavoritesPages />} />
      </Routes>
      </Suspense>
    </div>
  )
}

export default App
