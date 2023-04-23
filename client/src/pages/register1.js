import { useState } from "react";
import { onRegistration, onRegistration1 } from "../api/auth";
import App from "../App";
import Layout from "../components/layout";
import "../App.css";
export const Register1 = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "A",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log({ ...values, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setValues({ ...values, role: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let { email, password } = values;
      let ob = { email: email, password: password, role: "A" };
      const { data1 } = await onRegistration(ob);
      const { data } = await onRegistration1(values);
      setError("");
      setSuccess(data.message);
      setValues({ username: "", email: "", password: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Add User</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="username"
            className="form-control"
            id="username"
            name="username"
            value={values.name}
            placeholder="Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            placeholder="test@gmail.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            className="form-control"
            id="password"
            name="password"
            placeholder="password"
            required
          />
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};
