import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { links } from "./utils/constants";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import SessionSelect from "./pages/SessionSelect";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";

import "./index.css";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(true);

  const handleQuizComplete = (c) => {
    setQuizCompleted(c);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="quiz"
            element={<Quiz handleQuizComplete={handleQuizComplete} />}
          />
          <Route path="sessionSelect" element={<SessionSelect />} />
          <Route path="profile" element={<Profile />} />
          {/*a "catch-all" for not explicit URLs*/}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link to={link.to}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* placeholder for the child routes defined above */}
      <Outlet />
    </div>
  );
}

export default App;
