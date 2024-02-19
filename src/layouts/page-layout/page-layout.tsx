import Footer from "@components/common/footer/footer";
import { cn } from "@lib/utils";
import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  pageTitle: string | ReactNode;
  withSidebar?: boolean;
  sidebarContent?: ReactNode;
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
        "flex items-center rounded-md text-center text-pretty p-3 shrink-0 justify-center w-full h-full bg-gradient-to-br from-primary to-secondary ",
        className,
      )}
    >
      <h3 className="text-base font-semibold capitalize text-pretty text-text-color">
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
  sidebarContent,
}: PageLayoutProps) {
  if (withSidebar && !sidebarContent) {
    throw new Error(
      "You must provide sidebarContent when withSidebar is true.",
    );
  }

  return (
    <section
      className={cn(
        "flex flex-col items-start justify-between w-full h-full gap-2 p-3 overflow-hidden bg-inherit md:flex-row md:px-4 md:py-3",
      )}
    >
      <section className="w-full overflow-hidden h-1/6 md:flex md:flex-col md:justify-between md:items-start md:gap-3 md:h-full md:w-1/5">
        <div className="w-full h-1/6">
          <PageHeader pageTitle={pageTitle} />
        </div>
        {withSidebar && (
          <div className="hidden overflow-hidden shadow-sm md:flex md:flex-1 md:w-full">
            {sidebarContent}
          </div>
        )}
        {withFooter && (
          <div className="hidden w-full text-text-color md:flex md:h-[5%] overflow-hidden">
            <Footer />
          </div>
        )}
      </section>
      <main className="flex-1 w-full p-2 overflow-hidden bg-inherit md:h-full">
        {children}
      </main>
    </section>
  );
}

export default PageLayout;
