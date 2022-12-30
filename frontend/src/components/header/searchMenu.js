import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helper/clickOutside";
import { Return, Search } from "../../svg";

export default function SearchMenu(props) {
  const color = "#65676b";

  // getting rid of search bar by clicking outside
  const el = useRef(null);
  useClickOutside(el, () => {
    props.setSearch(false);
  });

  // get rid of icon
  const [iconVisible, setIconVisible] = useState(true);

  // focus on search bar as soon as component loads (only once because depndency is null so it doesn't changes)
  const searchbar = useRef();
  useEffect(() => {
    searchbar.current.focus();
  }, []);

  // click on places other than search bar to unfocus
  useClickOutside(searchbar, () => {
    searchbar.current.blur();
  });

  return (
    <div className="header-left search-area scrollbar" ref={el}>
      <div className="search-wrap">
        <div className="header-logo">
          <div
            className="circle hover1"
            onClick={() => {
              props.setSearch(false);
            }}
          >
            <Return />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            searchbar.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Moshuibook"
            ref={searchbar}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              // not focused
              setIconVisible(true);
            }}
          ></input>
        </div>
      </div>
      <div className="search-history-header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search-history"></div>
      <div className="search-result-scrollbar"></div>
    </div>
  );
}
