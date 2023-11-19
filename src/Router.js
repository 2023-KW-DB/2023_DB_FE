import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import History from "./pages/History";
import BuyTicket from "./pages/BuyTicket";
import Payment from "./pages/Payment";
import NoticeBoardList from "./pages/NoticeBoardList";
import NoticeBoardRead from "./pages/NoticeBoardRead";
import NoticeBoardWrite from "./pages/NoticeBoardWrite";
import Admin from "./pages/Admin";
import TravelRating from "./pages/TravelRating";
import RatingReview from "./pages/RatingReview";
import UserPage from "./pages/UserPage";
import Favorite from "./pages/Favorite";



const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<History />} />
      <Route path="/ticket" element={<BuyTicket />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/board/notice" element={<NoticeBoardList />} />
      <Route path="/board/notice/read" element={<NoticeBoardRead />} />
      <Route path="/board/notice/write" element={<NoticeBoardWrite />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/travelrating" element={<TravelRating />} />
      <Route path="/ratingreview" element={<RatingReview/>}/>
      <Route path="/userpage" element={<UserPage/>}/>
      <Route path="/favorite" element={<Favorite/>}/>
    </Routes>
  );
};

export default router;
