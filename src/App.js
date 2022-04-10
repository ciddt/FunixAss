import React from "react";
import Main from "./component/MainComponent";
import './App.css';
import { BrowserRouter } from "react-router-dom";

// Su dung BrowserRouter su dung bo dinh tuyen History API cua HTML5 de giu giao dien nguoi dung dong bo voi URL
// BrowserRouter la thanh phan me luu tru bao tat ca cac thanh phan khac
// No duoc dung voi cac web dong
// Nếu dùng NavLink mà không có BrowserRouter sẽ báo lỗi useLocation() do không
// Có bộ định tuyến mẹ
function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Main/>
      </div>
    </BrowserRouter>
  )
}
export default App;
