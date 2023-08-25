import styles from "./signup.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorData, setErrorData] = useState("");

  const fetchData = async (data) => {
    try {
      const response = await axios.post("http://localhost/api/signup", data);
      router.push("/login");
      setSuccessMessage("登録成功しました。");
      console.log("Registration successful!", response.data);
    } catch (error) {
      const errorData = error.response?.data || {};
      setErrorData(errorData);
      setErrorMessage("登録失敗しました。");
      console.error("Registration failed:", error);
    }
  };

  const onSubmit = (data) => {
    fetchData(data);
  };

  console.log(errorData);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>
          <div className={styles.a}>
            <h2>SIGN UP</h2>
          </div>
          <div className={styles.b}>
            <p>管理者情報登録</p>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.formtitle}>
            <p>管理者情報</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formData}>
              {[
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
                      value === getValues("password") ||
                      "パスワードが一致しません",
                  },
                },
              ].map(({ label, name, rules }) => (
                <div key={name}>
                  <p>{label}</p>
                  <input
                    type={name.includes("password") ? "password" : "text"}
                    {...register(name, rules)}
                  />
                  {errors[name] && (
                    <div className={styles.errors}>{errors[name]?.message}</div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <button type="submit" className={styles.button}>
                登録する
              </button>
              {errorData && (
                <div className="alert">
                  {errorData.message || "エラーが発生しました"}
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
