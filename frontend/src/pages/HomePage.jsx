import { useAuth } from "../features/auth/hooks/useAuth.js";
import { Button } from "../features/auth/components/Button.jsx";

function HomePage() {
  const { authState, logout } = useAuth();
  const { user, isSubmitting, error } = authState;

  return (
    <main className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-12 mt-12">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Authenticated
            </span>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {user?.username ? `Welcome back, ${user.username}` : "Welcome back"}
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Your auth UI is live and connected. This home page is the handoff point for
              resume upload, ATS scoring, and interview preparation modules.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={logout} 
            isLoading={isSubmitting}
            className="shrink-0"
          >
            Logout
          </Button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="glass-card p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-sm font-medium text-primary">Account</span>
            <strong className="text-xl font-semibold">{user?.email || "No email available"}</strong>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Cookie-backed login flow is active. Extend this into profile and session management next.</p>
          </article>
          <article className="glass-card p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-sm font-medium text-primary">Next module</span>
            <strong className="text-xl font-semibold">Resume intake pipeline</strong>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Wire upload validation, parsing status, and asynchronous AI analysis from this authenticated shell.</p>
          </article>
          <article className="glass-card p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-sm font-medium text-primary">Security note</span>
            <strong className="text-xl font-semibold">Server remains source of truth</strong>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Frontend validation is only for UX. Authorization still depends on backend cookies and guards.</p>
          </article>
        </section>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
