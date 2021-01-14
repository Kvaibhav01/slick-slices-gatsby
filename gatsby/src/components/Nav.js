import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;

  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    margin-top: -6rem;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto 1fr 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  li {
    --rotate: 2deg;
    transform: rotate(var(--rotate));
    order: 1;

    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
  }

  a {
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      color: var(--red);
    }

    /* &[aria-current='page'] {
      color: var(--red);
    } */
  }
`;

export default function Nav() {
  return (
    <div>
      <NavStyles>
        <ul>
          <li>
            <Link to="/beers">Beers!</Link>
          </li>
          <li>
            <Link to="/">Hot Now</Link>
          </li>
          <li>
            <Link to="/pizzas/">Pizza Menu</Link>
          </li>
          <li>
            <Link to="/">
              <Logo classname="logo" />
            </Link>
          </li>
          <li>
            <Link to="/slicemasters">SliceMasters</Link>
          </li>
          <li>
            <Link to="/order">Order Ahead!</Link>
          </li>
          <li>
            <Link to="/beers">Beers!</Link>
          </li>
        </ul>
      </NavStyles>
    </div>
  );
}
