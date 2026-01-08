import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  createUser,
  addComponent,
  addUsage,
  getUserUsage,
} from "../../api/adminApi";

export default function AdminDashboard() {
  const RATE_PER_UNIT = 6;

  const [activeTab, setActiveTab] = useState("user");
  const [loading, setLoading] = useState(false);

  // Local storage for users, components, and usages
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });
  const [components, setComponents] = useState(() => {
    const saved = localStorage.getItem("components");
    return saved ? JSON.parse(saved) : {};
  });
  const [usages, setUsages] = useState(() => {
    const saved = localStorage.getItem("usages");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedUser, setSelectedUser] = useState("");

  // Create user
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // Electric component
  const [component, setComponent] = useState({
    name: "",
    watt: "",
  });

  // Usage (AUTO BILL)
  const [usage, setUsage] = useState({
    username: "",
    month: "",
    year: "",
    totalUnits: "",
    totalBill: "",
    componentUsages: {}, // {componentName: units}
  });

  // Reports
  const [report, setReport] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));

  // Auto calculate bill when totalUnits changes
  useEffect(() => {
    if (usage.totalUnits) {
      setUsage(prev => ({
        ...prev,
        totalBill: (parseFloat(usage.totalUnits) * RATE_PER_UNIT).toFixed(2)
      }));
    } else {
      setUsage(prev => ({
        ...prev,
        totalBill: ""
      }));
    }
  }, [usage.totalUnits]);

  /* ================= CREATE USER ================= */
  const handleCreateUser = async () => {
    if (!user.username || !user.password) {
      alert("Please fill all fields");
      return;
    }

    // Check if user already exists
    if (users.some(u => u.username === user.username)) {
      alert("Username already exists");
      return;
    }

    const newUser = { ...user, role: "USER" };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Initialize components and usages for the user
    const updatedComponents = { ...components, [user.username]: [] };
    setComponents(updatedComponents);
    localStorage.setItem("components", JSON.stringify(updatedComponents));

    const updatedUsages = { ...usages, [user.username]: [] };
    setUsages(updatedUsages);
    localStorage.setItem("usages", JSON.stringify(updatedUsages));

    alert("User created successfully");
    setUser({ username: "", password: "" });
  };

  /* ================= ADD COMPONENT ================= */
  const handleAddComponent = async () => {
    if (!selectedUser || !component.name || !component.watt) {
      alert("Please select a user and fill all fields");
      return;
    }

    const newComponent = { ...component };
    const userComponents = components[selectedUser] || [];
    const updatedUserComponents = [...userComponents, newComponent];
    const updatedComponents = { ...components, [selectedUser]: updatedUserComponents };
    setComponents(updatedComponents);
    localStorage.setItem("components", JSON.stringify(updatedComponents));
    alert("Component added successfully");
    setComponent({ name: "", watt: "" });
  };

  /* ================= ADD USAGE ================= */
  const handleAddUsage = async () => {
    if (!selectedUser || !usage.month || !usage.year) {
      alert("Please select a user and fill month/year");
      return;
    }

    const totalBill = usage.totalUnits * RATE_PER_UNIT;
    const newUsage = {
      ...usage,
      username: selectedUser,
      totalBill,
      applianceUnits: usage.componentUsages // Store component usage data
    };
    const userUsages = usages[selectedUser] || [];
    const updatedUserUsages = [...userUsages, newUsage];
    const updatedUsages = { ...usages, [selectedUser]: updatedUserUsages };
    setUsages(updatedUsages);
    localStorage.setItem("usages", JSON.stringify(updatedUsages));
    alert("Usage saved successfully");
    setUsage({
      username: "",
      month: "",
      year: "",
      totalUnits: "",
      totalBill: "",
      componentUsages: {},
    });
  };

  /* ================= REPORT ================= */
  const handleSearch = async () => {
    if (!searchUser) {
      alert("Enter username");
      return;
    }

    setLoading(true);
    try {
      const res = await getUserUsage(searchUser);
      setReport(res.data);
    } catch (e) {
      alert("No data found");
      setReport([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ALL USAGES ================= */
  const handleGetAllUsages = () => {
    const all = [];
    Object.keys(usages).forEach(username => {
      usages[username].forEach(u => all.push(u));
    });
    setAllUsages(all);
  };

  return (
    <>
      <Navbar />

      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className="admin-btn admin-btn-primary"  onClick={() => setActiveTab("createUser")}>Create User</button>
          <button className="admin-btn admin-btn-primary"  onClick={() => setActiveTab("manageUser")}>Manage User</button>
        </div>

        {/* CREATE USER */}
        {activeTab === "createUser" && (
          <div className="admin-form-container">
            <h3>Create User</h3>
            <div className="admin-form-group">
              <label>Username</label>
              <input
                placeholder="Username"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
            </div>
            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </div>
            <button className="admin-btn admin-btn-primary" onClick={handleCreateUser} disabled={loading}>
              Create User
            </button>
          </div>
        )}

        {/* MANAGE USER */}
        {activeTab === "manageUser" && (
          <div>
            <div className="admin-form-container">
              <h3>Select User</h3>
              <div className="admin-form-group">
                <label>Select a user to manage</label>
                <select className="admin-search-input" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                  <option value="">Select a user</option>
                  {users.map((u, i) => (
                    <option key={i} value={u.username}>{u.username}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedUser && (
              <div>
                <h3 style={{ textAlign: 'center', margin: '30px 0', color: '#333' }}>Managing User: <span style={{ color: '#667eea', fontWeight: 'bold' }}>{selectedUser}</span></h3>

                {/* ADD COMPONENT */}
                <div className="admin-form-container">
                  <h4>Add Electric Component</h4>
                  <div className="admin-form-group">
                    <label>Component Name</label>
                    <input
                      placeholder="Component Name"
                      value={component.name}
                      onChange={(e) =>
                        setComponent({ ...component, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Watt</label>
                    <input
                      type="number"
                      placeholder="Watt"
                      value={component.watt}
                      onChange={(e) =>
                        setComponent({ ...component, watt: e.target.value })
                      }
                    />
                  </div>
                  <button className="admin-btn admin-btn-primary" onClick={handleAddComponent} disabled={loading}>
                    Add Component
                  </button>
                </div>

                {/* ADD USAGE */}
                <div className="admin-form-container">
                  <h4>Add Monthly Usage</h4>

                  <div className="admin-form-group">
                    <label>Month</label>
                    <input
                      placeholder="Month"
                      value={usage.month}
                      onChange={(e) =>
                        setUsage({ ...usage, month: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Year</label>
                    <input
                      type="number"
                      placeholder="Year"
                      value={usage.year}
                      onChange={(e) =>
                        setUsage({ ...usage, year: e.target.value })
                      }
                    />
                  </div>

                  {/* Component Usage Inputs */}
                  <h5 style={{ marginTop: "20px", marginBottom: "10px" }}>Component Usage (hours per day)</h5>
                  {(components[selectedUser] || []).map((comp, index) => (
                    <div key={index} className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <label style={{ minWidth: "120px" }}>{comp.name} ({comp.watt}W)</label>
                      <input
                        type="number"
                        placeholder="Hours/day"
                        value={usage.componentUsages[comp.name] || ""}
                        onChange={(e) => {
                          const hours = parseFloat(e.target.value) || 0;
                          const daysInMonth = 30; // Approximate
                          const units = (comp.watt / 1000) * hours * daysInMonth; // kWh

                          setUsage({
                            ...usage,
                            componentUsages: {
                              ...usage.componentUsages,
                              [comp.name]: hours
                            },
                            totalUnits: Object.entries({
                              ...usage.componentUsages,
                              [comp.name]: hours
                            }).reduce((total, [name, hrs]) => {
                              const component = (components[selectedUser] || []).find(c => c.name === name);
                              if (component) {
                                return total + (component.watt / 1000) * hrs * daysInMonth;
                              }
                              return total;
                            }, 0)
                          });
                        }}
                        style={{ flex: 1 }}
                      />
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        ≈ {usage.componentUsages[comp.name] ?
                          ((comp.watt / 1000) * usage.componentUsages[comp.name] * 30).toFixed(2) : 0} units
                      </span>
                    </div>
                  ))}

                  <div className="admin-form-group">
                    <label>Total Units </label>
                    <input
                      type="number"
                      placeholder="Total Units"
                      value={usage.totalUnits}
                      readOnly
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Total Bill </label>
                    <input
                      type="number"
                      placeholder="Total Bill"
                      value={usage.totalBill}
                      readOnly
                    />
                  </div>

                  <button className="admin-btn admin-btn-primary" onClick={handleAddUsage} disabled={loading}>
                    Save Usage
                  </button>
                </div>

                {/* REPORT */}
                <div className="admin-table-container">
                  <h4>User Reports</h4>

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Units</th>
                        <th>Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(usages[selectedUser] || []).map((r, i) => (
                        <tr key={i}>
                          <td>{r.month}</td>
                          <td>{r.year}</td>
                          <td>{r.totalUnits}</td>
                          <td>₹ {r.totalBill}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* VIEW COMPONENTS */}
                <div className="admin-table-container">
                  <h4>User Components</h4>

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Watt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(components[selectedUser] || []).map((c, i) => (
                        <tr key={i}>
                          <td>{c.name}</td>
                          <td>{c.watt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
