import { createFileRoute, Outlet, useNavigate, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_productLayout')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProductLayout,
});

function ProductLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('auth-storage');
    
    // Force a full page reload to reset all state
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ProductShowcase</span>
            </a>
            <nav className="hidden gap-6 md:flex">
              <a href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Products
              </a>
              {/* <a href="/my-products" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                My Products
              </a> */}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ProductShowcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
