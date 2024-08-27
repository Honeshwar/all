"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/components/navbar/navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import CategoryDropdown from "@/components/navbar/categoryDropdown/CategoryDropdown";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currPath = usePathname();
  // console.log("navbar path", currPath);
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 500;

  const [isOpen, setIsOpen] = useState(false); //collpse state
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false); //dropdown
  const [showElectionDropdown, setShowElectionDropdown] = useState(false);
  //navbar collapse when clicked outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("click", () => {
    //   setShowElectionDropdown(false);
    // });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // toggle collapse
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //toggle dropdown
  const toggleDropDown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
    toggleNavbar();
  };

  // on hover open the category dropdown
  const handleMouseOver = () => {
    setDropDownIsOpen(true);
    setShowElectionDropdown(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className="navbar-logo">
          <Link href="/index.html">
            <img alt="image" src="/dhruv_logo.jpg" width={100} height={100} />
          </Link>
        </div>
        <div className={styles.toggler} onClick={toggleNavbar}>
          <img alt="image" src="/toggle.svg" width={30} height={30} />
        </div>
        <div
          className={`${styles.navbarLinks} ${isOpen ? styles.collapsed : ""}`}
        >
          {/* <Link href="../index.html">Home</Link> */}
          <Link href="/index.html#about">About Us</Link>
          <Link href="/index.html#what">What we do</Link>
          <Link href="/index.html#solution1">Solutions</Link>
          <a
            className={styles.activeLink}
            onClick={toggleDropDown}
            onMouseEnter={handleMouseOver}
          >
            <div className="flex flex-col">
              Insights
              {currPath === "/articles" && (
                <img src="/images/Star 1.png" alt="star" />
              )}
            </div>
            <div className={styles.dropDown} ref={dropdownRef}>
              {dropDownIsOpen && (
                <CategoryDropdown toggleDropDown={toggleDropDown} />
              )}
            </div>
          </a>
          {/* <Link className={styles.activeLink} href="/past-election-analysis">
            <div className="flex flex-col">
              Election Analysis
              {currPath === "/past-election-analysis" && (
                <img alt="image" src="/images/Star 1.png" alt="star" />
              )}
            </div>
          </Link> */}
          <Link href="/index.html#join_our_panel">Join our panel</Link>
          <Link href="/contact.html">Contact Us</Link>
          <Link href="/careers.html" className={styles.carrers}>
            <button>Careers</button>
          </Link>

          <div className={`${styles.electionContainer} ${styles.mobile}`}>
            <div
              className={styles.electionBtn}
              onClick={(e) => {
                // e.stopPropagation();
                setShowElectionDropdown((p) => !p);
                setDropDownIsOpen(false);
              }}
            >
              <span className={styles.electionText}> Election</span>
              <img className={styles.electionNew} src="/new.svg" alt="new" />

              <span className="text-[gray] ">
                <svg
                  className="w-5"
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32.000000 32.000000"
                  preserveAspectRatio="xMidYMid meet"
                  fill="#ffcc00"
                >
                  <g
                    transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path
                      d="M50 197 c0 -18 92 -107 111 -107 18 0 109 90 109 108 0 23 -24 12
            -67 -30 l-43 -42 -43 42 c-43 42 -67 53 -67 29z"
                    />
                  </g>
                </svg>
              </span>
            </div>

            {showElectionDropdown && (
              <>
                <ul id={styles.election_Btn_Dropdown}>
                  <li>
                    <Link
                      onClick={() => {
                        setShowElectionDropdown(false);
                        if (windowWidth < 1000) setIsOpen(true);
                      }}
                      href="/past-election-analysis"
                    >
                      Election Analysis
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        setShowElectionDropdown(false);
                        if (windowWidth < 1000) setIsOpen(true);
                      }}
                      href="/election-map-view"
                    >
                      Map View
                    </Link>
                  </li>
                  {/* <li></li> */}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className={styles.carrers}>
          <Link href="/careers.html">
            <button>Careers</button>
          </Link>
        </div>

        <div className={`${styles.electionContainer} ${styles.desktop}`}>
          <div
            className={styles.electionBtn}
            onClick={(e) => {
              // e.stopPropagation();
              setShowElectionDropdown((p) => !p);
              setDropDownIsOpen(false);
            }}
          >
            <span className={styles.electionText}> Election</span>
            <img className={styles.electionNew} src="/new.svg" alt="new" />

            <span className="text-[gray] ">
              <svg
                className="w-5"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32.000000 32.000000"
                preserveAspectRatio="xMidYMid meet"
                fill="#ffcc00"
              >
                <g
                  transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M50 197 c0 -18 92 -107 111 -107 18 0 109 90 109 108 0 23 -24 12
            -67 -30 l-43 -42 -43 42 c-43 42 -67 53 -67 29z"
                  />
                </g>
              </svg>
            </span>
          </div>

          {showElectionDropdown && (
            <>
              <ul id={styles.election_Btn_Dropdown}>
                <li>
                  <Link
                    onClick={() => setShowElectionDropdown(false)}
                    href="/past-election-analysis"
                  >
                    Election Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setShowElectionDropdown(false)}
                    href="/election-map-view"
                  >
                    Map View
                  </Link>
                </li>
                {/* <li></li> */}
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
