import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Link from "next/link";

const Index = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const itemTitles = ["id", "名前", "性別"];

  const getToken = () => {
    return localStorage.getItem("auth_token");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:80/api/index", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.counselors);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/login");
        } else {
          console.error("User情報が取得できませんでした。", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row font-bold min-h-screen bg-green-400">
      <Header />

      <div className="w-5/6 bg-gray-200 p-20 rounded-2xl">
        <div className="pb-10">
          <h1 className="text-6xl text-green-400">COUNSELOR LIST</h1>
          <p className="text-2xl">管理者ログイン</p>
        </div>
        <div className="bg-white text-lg">
          <ul className="flex flex-row border-b-8 items-center shadow pl-2">
            {itemTitles.map((item) => (
              <li key={item} className="w-1/3">
                {item}
              </li>
            ))}
          </ul>

          <ul className="border-b-gray-200 items-center shadow">
            {users.map((user) => (
              <div key={user.id} className="flex border-solid border-b-2 p-4">
                <Link href="/user/[id]" as={`/user/${user.id}`} data={{ user }}>
                  <a className="flex w-full justify-between">
                    <span className="w-1/3">{user.id}</span>
                    <span className="w-1/3">{user.name}</span>
                    <span className="w-1/3">{user.gender}</span>
                  </a>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
