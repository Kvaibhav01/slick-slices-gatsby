import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    display: grid;
    grid-column: span 2;
    gap: 1rem;
    align-content: start;
    max-height: 600px;
    overflow: auto;

    &.menu,
    &.order {
      grid-column: span 1;
    }
  }

  .mapleSyrup {
    display: none;
  }

  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }

    grid-template-columns: 1fr;
  }
`;

export default OrderStyles;
