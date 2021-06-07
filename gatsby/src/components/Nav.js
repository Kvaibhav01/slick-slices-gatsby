import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
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
    display: block;
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      color: var(--red);
    }

    @media (max-width: 800px) {
      font-size: 2rem;
    }

    /* &[aria-current='page'] {
      color: var(--red);
    } */
  }

  @media (max-width: 600px) {
    --columns: 3;
    margin-bottom: 5rem;
    border-bottom: 2px solid var(--grey);
    padding-bottom: 2rem;

    ul {
      grid-template-columns: repeat(var(--columns), 1fr);
      grid-template-rows: auto auto;
      justify-items: center;
    }

    .logo-item {
      order: 0;
      grid-column: 1 / -1;
    }

    .logo {
      transform: none;
    }
  }

  @media (max-width: 500px) {
    --columns: 2;
  }
`;

export default function Nav() {
  return (
    <div>
      <NavStyles>
        <ul>
          <li>
            <Link to='/beers'>Beers!</Link>
          </li>
          <li>
            <Link to='/'>Hot Now</Link>
          </li>
          <li>
            <Link to='/pizzas/'>Pizza Menu</Link>
          </li>
          <li className='logo-item'>
            <Link to='/'>
              <Logo className='logo' />
            </Link>
          </li>
          <li>
            <Link to='/slicemasters'>SliceMasters</Link>
          </li>
          <li>
            <Link to='/order'>Order Ahead!</Link>
          </li>
          <li>
            <Link to='/beers'>Beers!</Link>
          </li>
        </ul>
      </NavStyles>
    </div>
  );
}
