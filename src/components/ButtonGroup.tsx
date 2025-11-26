// Origin: https://github.com/shadcn-ui/ui/discussions/4283

import React, { Children, ReactElement, cloneElement } from "react";

import { ButtonProps } from "./button";
import { cn } from "../utils/utils";

interface ButtonGroupProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  children?: ReactElement<ButtonProps>[];
}

export const ButtonGroup = ({
  className,
  orientation = "horizontal",
  children,
}: ButtonGroupProps) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex",
        {
          "flex-col": isVertical,
          "w-fit": isVertical,
        },
        className
      )}
    >
      {Children.toArray(children)
        .filter(React.isValidElement)
        .map((child, index, array) => {
          const isFirst = index === 0;
          const isLast = index === array.length - 1;

          return cloneElement(child as ReactElement<ButtonProps>, {
            className: cn(
              (child as ReactElement<ButtonProps>).props.className,
              !isVertical && {
                "rounded-r-none": !isLast,
                "rounded-l-none": !isFirst,
                "border-l-0": !isFirst,
              },
              isVertical && {
                "rounded-b-none": !isLast,
                "rounded-t-none": !isFirst,
                "border-t-0": !isFirst,
              }
            ),
          });
        })}
    </div>
  );
};

