import React, { useEffect, useRef, useState } from "react";
import "../../css/header.css";
import { Link } from "react-router-dom";
import {
  Logo,
  Search,
  HomeActive,
  Friends,
  Watch,
  Market,
  Gaming,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./searchMenu";
import AllMenu from "./allMenu";
import useClickOutside from "../../helper/clickOutside";
import UserMenu from "./userMenu/userMenu";

export default function Header() {
  const color = "#65676b";

  const { user } = useSelector((user) => ({ ...user })); // get everything from "user" in redux store

  // getting rid of search bar
  const [search, setSearch] = useState(false);

  // main menu open and close
  const [allMenuVisible, setAllMenuVisible] = useState(false);
  const allMenuRef = useRef(null);
  useClickOutside(allMenuRef, () => {
    setAllMenuVisible(false);
  });

  // user menu open and close
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const userMenuRef = useRef(null);
  useClickOutside(userMenuRef, () => {
    setUserMenuVisible(false);
  });

  const [midBlue, setMidBlue] = useState(0);

  const [rightBlue, setRightBlue] = useState(0);

  return (
    <header>
      <div className="header-left">
        <Link to="/" className="header-logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Moshuibook"
            className="hide-input"
            onClick={() => {
              setSearch(true);
            }}
          ></input>
        </div>
      </div>
      {search && <SearchMenu setSearch={setSearch} />}
      <div className="header-middle">
        <Link to="/" className="middle-icon hover1 active">
          <HomeActive color={color} />
        </Link>
        <Link to="/" className="middle-icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle-icon hover1">
          <Watch color={color} />
          <div className="middle-notification">9+</div>
        </Link>
        <Link to="/" className="middle-icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle-icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header-right">
        {user && (
          <Link to="/profile" className="profile-link hover1">
            {/* Make sure user exists first! */}
            <img src={user?.picture} />
            <span>{user?.firstName}</span>
          </Link>
        )}

        <div
          className={
            allMenuVisible
              ? "circle-icon hover1 active-header"
              : "circle-icon hover1"
          }
          ref={allMenuRef}
        >
          <div
            className="click-button"
            onClick={() => {
              setAllMenuVisible(!allMenuVisible);
            }}
          >
            <Menu />
          </div>

          {allMenuVisible && <AllMenu />}
        </div>
        <div className="circle-icon hover1">
          <Messenger />
        </div>
        <div className="circle-icon hover1">
          <Notifications />
          <div className="right-notification">9</div>
        </div>
        <div
          className={
            userMenuVisible
              ? "circle-icon hover1 active-header"
              : "circle-icon hover1"
          }
          ref={userMenuRef}
        >
          <div
            className="click-button"
            onClick={() => {
              setUserMenuVisible(!userMenuVisible);
            }}
          >
            <ArrowDown />
          </div>
          {userMenuVisible && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
