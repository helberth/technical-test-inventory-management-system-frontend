import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_publicLayout/home')({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Inventory Management System
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A secure platform for managing your product inventory with ease.
          </p>
        </div>
        
        <div className="grid w-full max-w-2xl gap-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Secure Access Required</h2>
            <p className="text-muted-foreground">
              Please log in to access and manage your inventory.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Login to Your Account
            </a>
            <a
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Create New Account
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Don't have an account? Register now to get started with our inventory management system.
          </p>
        </div>
      </div>
    </section>
  );
}
