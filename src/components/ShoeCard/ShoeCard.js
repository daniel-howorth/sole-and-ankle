import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const flag =
    variant === "on-sale" ? (
      <SaleFlag>Sale</SaleFlag>
    ) : variant === "new-release" ? (
      <NewReleaseFlag>Just Released!</NewReleaseFlag>
    ) : null;

  const priceLabel =
    variant === "on-sale" ? (
      <Price
        style={{
          textDecoration: "line-through",
          color: "hsla(210, 5%, 40%, 1)",
        }}
      >
        {formatPrice(price)}
      </Price>
    ) : (
      <Price>{formatPrice(price)}</Price>
    );

  const salePriceLabel =
    variant === "on-sale" ? (
      <SalePrice>{formatPrice(salePrice)}</SalePrice>
    ) : null;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {flag}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {/* <Price>{formatPrice(price)}</Price> */}
          {priceLabel}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePriceLabel}
        </Row>
      </Wrapper>
    </Link>
  );
};

const SaleFlag = styled.div`
  width: 48px;
  height: 32px;
  background: hsla(340, 65%, 47%, 1);
  position: absolute;
  right: -8px;
  top: 12px;
  z-index: 1;
  color: hsla(0, 0%, 100%, 1);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewReleaseFlag = styled.div`
  width: 118px;
  height: 32px;
  background: hsla(240, 60%, 63%, 1);
  position: absolute;
  right: -8px;
  top: 12px;
  z-index: 1;
  color: hsla(0, 0%, 100%, 1);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 300px;
`;

const Wrapper = styled.article`
  position: relative;
  isolation: isolate;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-left: auto;
`;

export default ShoeCard;
