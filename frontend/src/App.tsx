import { Routes, Route } from "react-router-dom";
import { TrendPage } from "./recipe/pages/TrandPage";
import { RecipeLayout } from "./recipe/RecipeLayout";
import { ChefsPage } from "./recipe/pages/ChefsPage";
import { LatestPage } from "./recipe/pages/LatestPage";
import { RecipeBookPage } from "./recipe/pages/RecipeBookPage";
import { Header } from "./share/components/Header";
import { MyPage } from "./my/pages/MyPage";
import LoginPage from "./auth/pages/LoginPage";
import { RegisterProfilePage } from "./auth/pages/RegisterProfilePage";

function App() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route element={<RecipeLayout />}>
            <Route path="/" element={<TrendPage />} />
            <Route path="/chef" element={<ChefsPage />} />
            <Route path="/latest" element={<LatestPage />} />
            <Route path="/book" element={<RecipeBookPage />} />
          </Route>

          <Route path="/my" element={<MyPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
