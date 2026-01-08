import { useState } from "react";
import { createUser } from "../../api/adminApi";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      alert("All fields required");
      return;
    }

  try {
  await createUser(form);
  alert("User created successfully");
} catch (err) {
  alert(err.response?.data?.message || "User already exists");
}

  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <br /><br />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
