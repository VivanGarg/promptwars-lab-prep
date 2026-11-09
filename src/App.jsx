import { useState } from "react";
import {
  FlaskConical,
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  Settings,
  Bell,
  Clock,
  CheckCircle2,
  Monitor,
  Wrench,
  BookOpen,
  ChevronRight,
  Search,
  GraduationCap,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import "./App.css";

const initialLabs = [
  {
    id: 1,
    name: "Data Structures Lab",
    subject: "Computer Science",
    date: "Nov 12, 2026",
    time: "10:00 AM",
    room: "Lab 204",
    color: "purple",
    requirements: [
      { name: "Install VS Code", category: "Software", done: true },
      { name: "Configure C++ compiler", category: "Software", done: true },
      { name: "Revise linked lists", category: "Preparation", done: false },
      { name: "Bring lab record", category: "Equipment", done: false },
      { name: "Practice sorting algorithms", category: "Preparation", done: false },
    ],
  },
  {
    id: 2,
    name: "Database Management Lab",
    subject: "Computer Science",
    date: "Nov 15, 2026",
    time: "2:00 PM",
    room: "Lab 301",
    color: "blue",
    requirements: [
      { name: "Install MySQL", category: "Software", done: true },
      { name: "Configure database connection", category: "Software", done: false },
      { name: "Revise SQL queries", category: "Preparation", done: false },
      { name: "Bring lab manual", category: "Equipment", done: false },
    ],
  },
  {
    id: 3,
    name: "Operating Systems Lab",
    subject: "Computer Science",
    date: "Nov 18, 2026",
    time: "11:30 AM",
    room: "Lab 105",
    color: "orange",
    requirements: [
      { name: "Install Linux environment", category: "Software", done: false },
      { name: "Revise process scheduling", category: "Preparation", done: false },
      { name: "Prepare lab record", category: "Equipment", done: false },
      { name: "Practice shell commands", category: "Preparation", done: false },
    ],
  },
];

function App() {
  const [labs, setLabs] = useState(initialLabs);
  const [selectedLab, setSelectedLab] = useState(initialLabs[0]);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const currentLab = labs.find((lab) => lab.id === selectedLab.id) || selectedLab;

  const completed = currentLab.requirements.filter((item) => item.done).length;
  const total = currentLab.requirements.length;
  const readiness = Math.round((completed / total) * 100);

  function toggleRequirement(index) {
    setLabs((previous) =>
      previous.map((lab) =>
        lab.id === currentLab.id
          ? {
              ...lab,
              requirements: lab.requirements.map((item, i) =>
                i === index ? { ...item, done: !item.done } : item
              ),
            }
          : lab
      )
    );
  }

  const totalRequirements = labs.reduce(
    (sum, lab) => sum + lab.requirements.length,
    0
  );

  const totalCompleted = labs.reduce(
    (sum, lab) => sum + lab.requirements.filter((item) => item.done).length,
    0
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><FlaskConical size={23} /></div>
          <div>
            <h2>LabPrep</h2>
            <p>Ready for practicals</p>
          </div>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          {[
            { name: "Dashboard", icon: LayoutDashboard },
            { name: "My Practicals", icon: FlaskConical },
            { name: "Preparation Checklist", icon: ClipboardCheck },
            { name: "Exam Schedule", icon: CalendarDays },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${activeNav === item.name ? "active" : ""}`}
                onClick={() => setActiveNav(item.name)}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <GraduationCap size={22} />
            <h3>Walk in prepared.</h3>
            <p>Everything you need for your next practical, in one place.</p>
          </div>

          <button className="nav-item">
            <Settings size={19} /> Settings
          </button>

          <div className="profile">
            <div className="avatar">VG</div>
            <div>
              <h4>Student Workspace</h4>
              <p>Computer Science</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">YOUR LAB WORKSPACE</p>
            <h1>Ready for your next practical? 🧪</h1>
            <p className="subtitle">
              Stay prepared, stay confident, and never miss a requirement.
            </p>
          </div>

          <div className="header-actions">
            <button className="icon-button"><Search size={19} /></button>
            <button className="icon-button"><Bell size={19} /></button>
            <div className="avatar">VG</div>
          </div>
        </header>

        <section className="banner">
          <div>
            <span className="banner-tag">YOUR PRACTICAL EXAM COMPANION</span>
            <h2>Preparation today. Confidence tomorrow.</h2>
            <p>
              Track your software, equipment, and revision so nothing catches
              you off guard on exam day.
            </p>
          </div>
          <div className="banner-icon"><FlaskConical size={52} /></div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon purple"><FlaskConical size={21} /></div>
            <p>Upcoming Practicals</p>
            <h2>{labs.length}</h2>
            <span>Scheduled lab sessions</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon green"><CheckCircle2 size={21} /></div>
            <p>Requirements Completed</p>
            <h2>{totalCompleted}/{totalRequirements}</h2>
            <span>Across all practicals</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange"><Clock size={21} /></div>
            <p>Next Practical</p>
            <h2>Nov 12</h2>
            <span>Data Structures Lab</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="main-content">
            <div className="section-heading">
              <div>
                <h2>Upcoming practicals</h2>
                <p>Select a lab to view its preparation requirements.</p>
              </div>
              <span className="count">{labs.length} scheduled</span>
            </div>

            <div className="lab-list">
              {labs.map((lab) => {
                const done = lab.requirements.filter((item) => item.done).length;
                const score = Math.round((done / lab.requirements.length) * 100);

                return (
                  <button
                    key={lab.id}
                    className={`lab-card ${currentLab.id === lab.id ? "selected" : ""}`}
                    onClick={() => setSelectedLab(lab)}
                  >
                    <div className={`lab-icon ${lab.color}`}>
                      <FlaskConical size={22} />
                    </div>
                    <div className="lab-info">
                      <p>{lab.subject}</p>
                      <h3>{lab.name}</h3>
                      <span><CalendarDays size={13} /> {lab.date} · {lab.time}</span>
                    </div>
                    <div className="lab-progress">
                      <strong>{score}%</strong>
                      <span>Ready</span>
                    </div>
                    <ChevronRight size={18} className="chevron" />
                  </button>
                );
              })}
            </div>

            <div className="section-heading checklist-heading">
              <div>
                <h2>Preparation checklist</h2>
                <p>Everything you need for {currentLab.name}.</p>
              </div>
              <span className="count">{completed}/{total} done</span>
            </div>

            <div className="checklist">
              {currentLab.requirements.map((item, index) => (
                <label className="check-item" key={item.name}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleRequirement(index)}
                  />
                  <span className={`custom-check ${item.done ? "checked" : ""}`}>
                    {item.done && <CheckCircle2 size={17} />}
                  </span>
                  <div className="check-info">
                    <h4 className={item.done ? "completed-text" : ""}>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <span className={`category ${item.category.toLowerCase()}`}>
                    {item.category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <aside className="right-panel">
            <div className="readiness-card">
              <div className="section-heading">
                <div>
                  <h3>Practical readiness</h3>
                  <p>{currentLab.name}</p>
                </div>
                <ClipboardCheck size={19} />
              </div>

              <div
                className="readiness-circle"
                style={{ "--progress": `${readiness}%` }}
              >
                <div>
                  <h2>{readiness}%</h2>
                  <p>Prepared</p>
                </div>
              </div>

              <p className="readiness-description">
                {readiness === 100
                  ? "Amazing! You're ready for this practical."
                  : "Complete your checklist to improve your readiness."}
              </p>

              <div className="readiness-breakdown">
                <div><span className="dot green-dot" /> Completed <strong>{completed}</strong></div>
                <div><span className="dot gray-dot" /> Remaining <strong>{total - completed}</strong></div>
              </div>
            </div>

            <div className="requirements-card">
              <h3>Don't forget!</h3>
              <p>Double-check these essentials before your lab.</p>

              <div className="essential">
                <Monitor size={19} />
                <div><h4>Software</h4><p>Verify your environment works.</p></div>
              </div>
              <div className="essential">
                <Wrench size={19} />
                <div><h4>Equipment</h4><p>Bring your lab record and essentials.</p></div>
              </div>
              <div className="essential">
                <BookOpen size={19} />
                <div><h4>Revision</h4><p>Review experiments and concepts.</p></div>
              </div>

              <div className="tip">
                <AlertCircle size={17} />
                <span>Test your software before exam day to avoid last-minute issues.</span>
              </div>
            </div>
          </aside>
        </section>

        <footer>LabPrep · Your practicals, under control.</footer>
      </main>
    </div>
  );
}

export default App;