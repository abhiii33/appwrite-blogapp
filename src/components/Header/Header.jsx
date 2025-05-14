import React from "react";
import { Logo, Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status);
  const navitems = [
    {
      name: "Home",
      slug: "/home",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container>
        <nav>
          <div>
          <Link to="/">
                  <Logo />
          </Link>
         </div>
          <div>
          <ul>
            {navitems.map((item)=>{ return item.active?(
              <li key={item.name} >
                <button onClick={()=>navigate(item.slug)}>
                {item.name}</button>
              </li>
            ):null
            })}

          {authStatus && (
            <li className="flex items-center gap-4">
              <LogoutBtn />
            </li>
          )}
        </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
