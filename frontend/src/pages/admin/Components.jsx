import { useEffect, useState } from "react";
import { addComponent } from "../../api/adminApi";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Components() {
  const [components, setComponents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    watt: "",
  });

  // fetch all components
  const fetchComponents = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/components`);
      setComponents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  // add component
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.watt) {
      alert("All fields are required");
      return;
    }

    try {
      await addComponent(form);
      alert("Component added successfully");
      setForm({ name: "", watt: "" });
      fetchComponents();
    } catch (err) {
      alert("Error adding component");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Electric Components</h2>

      {/* Add Component Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Component Name (AC, Fan...)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          type="number"
          placeholder="Watt Value"
          value={form.watt}
          onChange={(e) => setForm({ ...form, watt: e.target.value })}
        />
        <br />
        <button type="submit">Add Component</button>
      </form>

      <hr />

      {/* Components Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>#</th>
            <th>Component Name</th>
            <th>Watt</th>
          </tr>
        </thead>
        <tbody>
          {components.length === 0 ? (
            <tr>
              <td colSpan="3">No components added</td>
            </tr>
          ) : (
            components.map((c, index) => (
              <tr key={c.id || index}>
                <td>{index + 1}</td>
                <td>{c.name}</td>
                <td>{c.watt} W</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
