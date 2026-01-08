import { useEffect, useState } from "react";
import axios from "axios";
import { addUsage } from "../../api/adminApi";
import { RATE_PER_UNIT } from "../../utils/constants";
import { calculateUnits } from "../../utils/calculateUnits";

const API = process.env.REACT_APP_API_URL;

export default function UsageEntry() {
  const [components, setComponents] = useState([]);
  const [form, setForm] = useState({
    username: "",
    component: "",
    watt: 0,
    hours: "",
    quantity: "",
    month: "",
    year: "",
  });

  const [result, setResult] = useState({
    units: 0,
    bill: 0,
  });

  // fetch components
  useEffect(() => {
    axios.get(`${API}/api/admin/components`).then((res) => {
      setComponents(res.data);
    });
  }, []);

  // auto calculate
  useEffect(() => {
    const watt = parseFloat(form.watt) || 0;
    const hours = parseFloat(form.hours) || 0;
    const quantity = parseFloat(form.quantity) || 0;

    if (watt > 0 && hours > 0 && quantity > 0) {
      const days = 30; // fixed for simplicity
      const units = calculateUnits(watt, hours, days, quantity);
      const bill = units * RATE_PER_UNIT;
      setResult({
        units: units.toFixed(2),
        bill: bill.toFixed(2),
      });
    } else {
      setResult({
        units: 0,
        bill: 0,
      });
    }
  }, [form.watt, form.hours, form.quantity]);

  const handleComponentChange = (name) => {
    const comp = components.find((c) => c.name === name);
    setForm({
      ...form,
      component: name,
      watt: comp.watt,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.component ||
      !form.month ||
      !form.year
    ) {
      alert("All fields required");
      return;
    }

    const payload = {
      username: form.username,
      month: form.month,
      year: form.year,
      totalUnits: result.units,
      totalBill: result.bill,
    };

    await addUsage(payload);
    alert("Usage saved successfully");

    setForm({
      username: "",
      component: "",
      watt: 0,
      hours: "",
      quantity: "",
      month: "",
      year: "",
    });
    setResult({ units: 0, bill: 0 });
  };

  return (
    <div className="usage-entry-container">
      <h2>Monthly Usage Entry (Auto Bill Calculation)</h2>

      <form className="usage-form" onSubmit={handleSubmit}>
        <div className="usage-form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />
        </div>

        <div className="usage-form-group">
          <label>Electric Component</label>
          <select
            value={form.component}
            onChange={(e) => handleComponentChange(e.target.value)}
            required
          >
            <option value="">Select Component</option>
            {components.map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name} ({c.watt}W)
              </option>
            ))}
          </select>
        </div>

        <div className="usage-form-group">
          <label>Hours per Day</label>
          <input
            type="number"
            placeholder="Enter hours per day (e.g., 8)"
            value={form.hours}
            onChange={(e) =>
              setForm({ ...form, hours: e.target.value })
            }
            min="0"
            step="0.5"
            required
          />
        </div>

        <div className="usage-form-group">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity (e.g., 2 for 2 fans)"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            min="1"
            required
          />
        </div>

        <div className="usage-form-group">
          <label>Month</label>
          <input
            type="text"
            placeholder="Enter month (e.g., January)"
            value={form.month}
            onChange={(e) =>
              setForm({ ...form, month: e.target.value })
            }
            required
          />
        </div>

        <div className="usage-form-group">
          <label>Year</label>
          <input
            type="number"
            placeholder="Enter year (e.g., 2024)"
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
            min="2020"
            max="2030"
            required
          />
        </div>

        <div className="usage-calculation-result">
          <h4>Calculated Results:</h4>
          <p className="usage-units-display">
            Units: {result.units} kWh
          </p>
          <p className="usage-bill-display">
            Bill: ₹ {result.bill}
          </p>
          {(!form.watt || !form.hours || !form.quantity) && (
            <p className="usage-help-text">
              Fill in component, hours per day, and quantity to see automatic calculation
            </p>
          )}
        </div>

        <button
          type="submit"
          className="usage-submit-btn"
          disabled={!result.units || result.units === "0.00"}
        >
          Save Usage Entry
        </button>
      </form>
    </div>
  );
}
