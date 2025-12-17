
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
      </div>
      <UserNav />
    </header>
  );
}
