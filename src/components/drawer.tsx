import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../utils/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: (onClose: () => void) => ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <div
          className="fixed top-0 right-0 z-50 w-[320px] h-full bg-white shadow-lg p-4"
          style={{
            pointerEvents: "auto",
          }}
        >
          {children(onClose)}
        </div>
      )}
    </>
  );
};

interface DrawerTriggerProps {
  onClick: () => void;
  children: ReactNode;
}

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};

interface DrawerCloseProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export const DrawerClose: React.FC<DrawerCloseProps> = ({
  onClick,
  children,
}) => {
  return (
    children ?? (
      <button onClick={onClick} className="text-gray-500 hover:text-black">
        <X width={18} height={18} />
      </button>
    )
  );
};

interface DrawerContentProps {
  children: ReactNode;
  className?: string;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn("mt-4", className)}>{children}</div>;
};

