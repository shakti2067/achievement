import { ReactNode } from "react";

import clsx from "clsx";

type PageHeaderProps = {
  children?: ReactNode;
  label: ReactNode | string;
  navigatepage: string;
};

const PageHeader = ({ label, children }: PageHeaderProps) => {
  return (
    <div
      className={clsx(
        "flex justify-start items-center gap-[1.125rem] mb-[1.875rem] flex-wrap capitalize"
      )}
    >
      <p className="text-2xl text-blackolive">{label}</p>
      {children && children}
    </div>
  );
};

export default PageHeader;
