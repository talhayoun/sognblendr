import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const COLORS = {
  primaryDark: "#115b4c",
  primaryLight: "#B6EDC8",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 2.5rem;
  right: 2.5rem;
  border-radius: 50%;
  height: 3.5rem;
  width: 3.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;

const NavBackground = styled.div`
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 1.8rem;
  height: 2px;
  display: inline-block;
  margin-top: 1.7rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 1.8rem;
    height: 1.7px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.6rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.6rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;
  border-radius: 10px;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

export const Item = (props) => {
  return (
    <li>
      <ItemLink onClick={props.handleClick} to={props.redirect}>
        {props.title}
      </ItemLink>
    </li>
  );
};

export default function BurgerMenu() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const token = localStorage.getItem("token");
  const items = [
    {
      title: "Events List",
      redirect: "/eventslist",
      isVisible: token,
    },
    {
      title: "Create Event",
      redirect: "/createEvent",
      isVisible: token,
    },
    {
      title: "Settings (Edit Account)",
      redirect: "/settings",
      isVisible: token,
    },
    {
      title: "Terms & Conditions",
      redirect: "/Terms",
    },
    {
      title: "Log Out",
      redirect: "/",
      isVisible: token,
      handleLogout: () => {
        localStorage.removeItem("token");
        handleClick();
      },
    },
  ];
  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <Item title={"Home"} handleClick={handleClick} redirect={"/"} />
          {items &&
            items.map(
              (item, index) =>
                item.isVisible && (
                  <Item
                    key={index}
                    {...item}
                    handleClick={item.handleLogout ?? handleClick}
                  />
                )
            )}
        </List>
      </Navigation>
    </>
  );
}
