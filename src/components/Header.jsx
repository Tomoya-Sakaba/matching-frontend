import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function Header() {
  const router = useRouter();
  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        "http://localhost:80/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        localStorage.removeItem("auth_token");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex flex-col w-1/6 items-center mt-20 text-white  text-center">
      <div className="space-y-10">
        <div>
          <AiOutlineHome size={50} color={"white"} />
          <p>ホーム</p>
        </div>
        <div>
          <FaRegBell size={50} color={"white"} />
          <p>お知らせ</p>
        </div>
        <div>
          <FaRegBuilding size={50} color={"white"} />
          <p>企業一覧</p>
        </div>
      </div>
      <div className="mt-40">
        <button onClick={logout}>
          <BiLogOut size={50} color={"white"} />
          <p>ログアウト</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
