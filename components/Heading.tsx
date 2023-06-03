import React from "react";

interface Props {
  heading: string;
}
const Heading = ({ heading }: Props) => {
  return <h2>{heading}.</h2>;
};

export default Heading;
