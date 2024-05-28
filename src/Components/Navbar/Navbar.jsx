import React, { useEffect } from "react";
import "./navbar.css";
import { Container } from "react-bootstrap";

function Nav() {
  return (
      <div id="navBar">
        <div id="BrandName">D'Watch</div>
        <div>
          <ul id="navList">
            <li id="listItem1">Products</li>
            <li>About</li>
            <li>Contact</li>
            <li>
              <i
                class="fa-solid fa-cart-shopping"
                style={{ color: " #7cd50a;" }}
              ></i>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default Nav;
