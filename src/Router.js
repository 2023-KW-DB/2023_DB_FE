import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import History from "./pages/History";
import BuyTicket from "./pages/BuyTicket";
import Payment from "./pages/Payment";
import NoticeBoardList from "./pages/board/NoticeBoardList";
import NoticeBoardRead from "./pages/board/NoticeBoardRead";
import NoticeBoardWrite from "./pages/board/NoticeBoardWrite";
import FreeBoardRead from "./pages/board/FreeBoardRead";
import FreeBoardWrite from "./pages/board/FreeBoardWrite";
import Admin from "./pages/Admin";
import TravelRating from "./pages/TravelRating";
import RatingReview from "./pages/RatingReview";
import UserPage from "./pages/UserPage";
import Favorite from "./pages/Favorite";
import News from "./pages/News";
import AdminUserEdit from "./pages/admin/AdminUserEdit";
import AdminTicketEdit from "./pages/admin/AdminTicketEdit";
import Ranking from "./pages/Ranking";
import PasswordFind from "./pages/PasswordFind";
import AdminBikeEdit from "./pages/admin/AdminBikeEdit";
import AdminBikeAdd from "./pages/admin/AdminBikeAdd";
import AdminTicketAdd from "./pages/admin/AdminTicketAdd";
import AdminBikeStationEdit from "./pages/admin/AdminBikeStationEdit";
import AdminBikeStationAdd from "./pages/admin/AdminBikeStationAdd";
import AdminCouponEdit from "./pages/admin/AdminCouponEdit";
import AdminCouponAdd from "./pages/admin/AdminCouponAdd";
import Board from "./pages/Board";
import QnaBoardRead from "./pages/board/QnaBoardRead";
import QnaBoardWrite from "./pages/board/QnaBoardWrite";
import ReportBoardWrite from "./pages/board/ReportBoardWrite";
import ReportBoardRead from "./pages/board/ReportBoardRead";
import KakaoLoginOAuth from "./pages/KakaoLoginOAuth";
import Coupon from "./pages/Coupon";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<History />} />
      <Route path="/ticket" element={<BuyTicket />} />
      <Route path="/payment" element={<Payment />} />

      <Route path="/board" element={<Board />} />
      <Route path="/board/notice/read" element={<NoticeBoardRead />} />
      <Route path="/board/notice/write" element={<NoticeBoardWrite />} />

      <Route path="/board/free/read" element={<FreeBoardRead />} />
      <Route path="/board/free/write" element={<FreeBoardWrite />} />

      <Route path="/board/qna/read" element={<QnaBoardRead />} />
      <Route path="/board/qna/write" element={<QnaBoardWrite />} />

      <Route path="/board/report/read" element={<ReportBoardRead />} />
      <Route path="/board/report/write" element={<ReportBoardWrite />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/user/edit" element={<AdminUserEdit />} />

      <Route path="/admin/ticket/edit" element={<AdminTicketEdit />} />
      <Route path="/admin/ticket/add" element={<AdminTicketAdd />} />

      <Route path="/admin/bike/edit" element={<AdminBikeEdit />} />
      <Route path="/admin/bike/add" element={<AdminBikeAdd />} />

      <Route path="/admin/bikestation/edit" element={<AdminBikeStationEdit />} />
      <Route path="/admin/bikestation/add" element={<AdminBikeStationAdd />} />

      <Route path="/admin/coupon/edit" element={<AdminCouponEdit />} />
      <Route path="/admin/coupon/add" element={<AdminCouponAdd />} />
      <Route path="/travelrating" element={<TravelRating />} />
      <Route path="/ratingreview" element={<RatingReview />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/news" element={<News />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/find-password" element={<PasswordFind />} />
      <Route path="/oauth/kakao" element={<KakaoLoginOAuth />} />
      <Route path="/coupon" element={<Coupon />} />
    </Routes>
  );
};

export default router;
