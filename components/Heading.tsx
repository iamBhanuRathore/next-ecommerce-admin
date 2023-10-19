import React from "react";

interface Headingprops {
  title: string;
  description: string;
}

const Heading: React.FC<Headingprops> = ({ title, description }) => {
  return (
    <div className="text-3xl font-bold tracking-tight">
      <h2>{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
