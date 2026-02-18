import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20 sm:pb-0">
            <Sidebar />
            <div className="flex flex-col sm:pl-64">
                {/* Mobile Header could go here */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:hidden">
                    <span className="font-bold">KMJ Admin</span>
                    {/* Mobile Toggle would go here */}
                </header>

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
