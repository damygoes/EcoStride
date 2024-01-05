import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return <section className="w-full h-full p-4 bg-inherit">{children}</section>;
}

export default PageLayout;
