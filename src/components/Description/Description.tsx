import React from "react";
import "./Description.css";
interface DescriptionProps {
  title: string;
  duration: string;
  assignee: string;
}
export const Description = ({
  assignee,
  duration,
  title,
}: DescriptionProps) => {
  return (
    <div>
      <h3 className="assignee">{assignee}</h3>
      <h1 className="title">{title}</h1>
      <p className="duration">{duration}</p>
    </div>
  );
};
