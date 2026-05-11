import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/auth.context.jsx";
import AppRoutes from "./app.routes.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
