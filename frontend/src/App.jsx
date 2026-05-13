import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/auth.context.jsx";
import { Toaster } from "sonner";
import AppRoutes from "./app.routes.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors closeButton />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
