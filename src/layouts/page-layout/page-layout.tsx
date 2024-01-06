import { cn } from "@lib/utils";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  pageTitle: string;
  withSidebar?: boolean;
  withFooter?: boolean;
  headerImage?: string | ReactNode;
};

// Use 'Pick' to select only 'pageTitle' from PageLayoutProps
type PageHeaderProps = Pick<PageLayoutProps, "pageTitle"> & {
  className?: string;
};

const PageHeader = ({ pageTitle, className }: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full rounded-md p-2 shadow-md h-1/5 md:h-1/6 bg-gradient-to-br from-primary to-secondary",
        className,
      )}
    >
      <h3 className="font-semibold capitalize text-md text-pretty text-text-color">
        {pageTitle}
      </h3>
    </div>
  );
};

function PageLayout({
  children,
  pageTitle,
  withFooter,
  withSidebar,
}: PageLayoutProps) {
  return (
    <section className="flex flex-col w-full h-full gap-4 p-4 overflow-hidden bg-inherit md:px-6 md:py-1">
      <div className="flex-1 h-full md:flex md:justify-start md:items-start md:gap-4">
        {withSidebar && (
          <div className="hidden rounded-md shadow-sm md:flex md:flex-col md:gap-4 md:p-3 md:w-[12%] md:h-full dark:border dark:border-solid dark:border-white">
            <PageHeader pageTitle={pageTitle} />
            <div>Sidebar Content</div>
          </div>
        )}
        <main className="flex-1 h-full space-y-3 overflow-x-hidden overflow-y-auto">
          <PageHeader pageTitle={pageTitle} className="md:hidden" />
          <div className="flex-1 h-full p-4 overflow-x-hidden overflow-y-auto rounded-md shadow-sm bg-inherit md:p-6">
            {children}
          </div>
        </main>
      </div>
      {withFooter && (
        <div className="hidden p-3 rounded-sm text-text-color md:flex md:items-center md:w-full md:h-[3%] bg-gradient-to-br from-primary to-secondary">
          Footer
        </div>
      )}
    </section>
  );
}

export default PageLayout;
