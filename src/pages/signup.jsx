import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Title } from "../components/Title";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const formItems = [
    {
      label: "管理企業ID",
      name: "register_id",
      rules: { required: "入力が必須の項目です。" },
    },
    {
      label: "氏名",
      name: "name",
      rules: { required: "入力が必須の項目です。" },
    },
    {
      label: "氏名(カナ)",
      name: "name_kana",
      rules: { required: "入力が必須の項目です。" },
    },
    {
      label: "携帯電話番号[ハイフンなし]",
      name: "phone_number",
      rules: {
        required: "入力が必須の項目です。",
        pattern: {
          value: /^0\d{9,10}$/,
          message: "正しい電話番号を入力してください。",
        },
      },
    },
    {
      label: "メールアドレス",
      name: "email_address",
      rules: {
        required: "入力が必須の項目です。",
        pattern: {
          value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
          message: "正しいメールアドレス形式を入力してください。",
        },
      },
    },
    {
      label: "パスワード[8桁以上]",
      name: "password",
      rules: {
        required: "入力が必須の項目です。",
        minLength: {
          value: 8,
          message: "8文字以上入力してください。",
        },
      },
    },
    {
      label: "パスワード[確認]",
      name: "password_confirmation",
      rules: {
        required: "確認のためパスワードを再入力してください。",
        minLength: {
          value: 8,
          message: "8文字以上入力してください。",
        },
        validate: (value) =>
          value === getValues("password") || "パスワードが一致しません",
      },
    },
  ];

  const fetchData = async (data) => {
    try {
      const response = await axios.post("http://localhost:80/api/signup", data);
      router.push("/login");
      console.log("Registration successful!", response.data);
    } catch (error) {
      const errorData = error.response?.data || {};
      setError(errorData);
      console.log(errorData);
      console.error("Registration failed:", error);
    }
  };

  const onSubmit = (data) => {
    fetchData(data);
  };

  return (
    <div>
      <main className="flex flex-row min-h-screen">
        <Title info={{ title: "SIGN UP", subtitle: "管理者情報登録" }} />
        <div className="bg-gray-200 w-2/3 px-20 pt-40">
          <h2 className="font-bold text-4xl border-b-4 border-green-400 text-left pb-3">
            管理者情報
          </h2>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-20 py-20">
              {formItems.map(({ label, name, rules }) => (
                <div key={name} className="mb-5">
                  <label className="font-bold">{label}</label>
                  <input
                    className="mt-4 block w-full p-2 rounded-lg"
                    type={name.includes("password") ? "password" : "text"}
                    {...register(name, rules)}
                  />
                  {errors[name] && (
                    <div className="text-red-500 text-lg font-semibold">
                      {errors[name]?.message}
                    </div>
                  )}
                  {error && (
                    <div className="text-red-500 text-lg font-semibold">
                      {error.errors[name]}
                    </div>
                  )}
                </div>
              ))}

              <div className="text-center">
                <button
                  type=""
                  className="bg-green-400 font-bold text-lg rounded-3xl text-white px-4 py-2 my-10 w-2/3 shadow-lg"
                >
                  登録する
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
