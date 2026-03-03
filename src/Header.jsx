import { useState } from "react";
import "./Header.css"
function Header() {
  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <header>
        <h1 className="logo"><a href='#'>Learnova</a></h1>

        <nav className="nav-links">
          <a href='#'>Explore</a>
          <a href='#'>My learning</a>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="What you want learn ?"
            value={search}
            onChange={handleSearch}
          />
          <div className="search-icon"><img src="./photo_icons/search.png" alt="Search icon" /></div>
        </div>
        <div className="auth-buttons">
          <button className="log-in">Log In</button>
          <button className="sign-up">Sign Up</button>
        </div>

      </header>
    </>
  )
}
export default Header