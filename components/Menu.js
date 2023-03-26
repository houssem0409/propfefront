import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import { UserContext } from "../components/UserContext";

export default function Menu() {
  const {
    user,
    token,
    login,
    logout,
    gatherUserInfo,
    isAuthenticated,
    tokens,
    isAdmin,
    setfirst,
    mystartupManage,
  } = useContext(UserContext);
  const history = useRouter();
  const sigOnut = () => {
    history.push("/user/signin");
    logout();
  };
  const userRole = user?.data?.role;
  const router = useRouter();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            startups directory
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {userRole == "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" href="/admin">
                    <a className="nav-link">DashBoard</a>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" href="/home">
                  <a className="nav-link">home</a>
                </Link>
              </li>
              <ul className="navbar-nav" style={{ marginRight: "150px" }}>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    Advanced
                  </a>
                  <ul
                    className="dropdown-menu"
                    style={{ marginRight: "120px" }}
                  >
                    <li className="nav-item">
                      <Link className="nav-link" href="/startups">
                        <a className="dropdown-item">Startups</a>
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" href="/events">
                        <a className="dropdown-item">Events</a>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="nav-link" href="/users">
                        <a className="dropdown-item">Peoples</a>
                      </Link>
                    </li>
                    <li>
                      <div className="nav-link">
                        <a className="dropdown-item">Challanges</a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ background: "white" }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        {!isAuthenticated && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "30%",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                backgroundColor: "GrayText",
                borderStyle: "solid",
                borderRadius: 10,
                borderColor: "black",
              }}
            >
              <Link href="/user/signup">
                <a
                  style={{ color: "black", fontSize: 10 }}
                  className="nav-link"
                >
                  SignUp
                </a>
              </Link>{" "}
            </div>

            <div
              style={{
                backgroundColor: "GrayText",
                borderStyle: "solid",
                borderRadius: 10,
                borderColor: "black",
              }}
            >
              <Link href="/user/signin">
                <a
                  style={{ color: "black", fontSize: 10 }}
                  className="nav-link"
                >
                  SignIn
                </a>
              </Link>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <ul className="navbar-nav" style={{ marginRight: "150px" }}>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
              </a>
              <ul className="dropdown-menu" style={{ marginRight: "120px" }}>
                <li className="nav-item">
                  <Link className="nav-link" href="/profile">
                    <a className="dropdown-item">Profile</a>
                  </Link>
                </li>
                {mystartupManage && (
                  <li>
                    <a
                      style={{ backgroundColor: "#D4FA99" }}
                      className="dropdown-item"
                      onClick={() =>
                        router.push(
                          `/startups/details/${mystartupManage?.data?._id}`
                        )
                      }
                    >
                      {mystartupManage?.data?.name}
                    </a>
                  </li>
                )}
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <div className="nav-link">
                    <a className="dropdown-item" onClick={sigOnut}>
                      Signout
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
