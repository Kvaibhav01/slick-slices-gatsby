import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;

  --columns: 2;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));

  @media (max-width: 800px) {
    --columns: 1;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// Single Grid item from Homepage
export const ItemStyles = styled.div`
  text-align: center;
  position: relative;

  img {
    height: auto;
    font-size: 0;
    border-radius: 5px;
    border: 2px dashed var(--yellow);
  }

  p {
    top: 0;
    transform: rotate(-2deg) translateY(-10px);
    position: absolute;
    width: 100%;
    left: 0;
    margin: 0;

    /* Fallback for browsers which don't support 'clamp()' */
    font-size: 2rem;
    font-size: clamp(12px, 5vw, 20px);
  }

  .mark {
    display: inline;
  }

  img.loading {
    --shine: #fff;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }

  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
`;
