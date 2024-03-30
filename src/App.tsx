import { AppRoutes } from "@/routes";
import { AppProvider } from "./providers/app";
import Header from "./components/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <AppProvider>
      <Header />
      <AppRoutes />
      <Footer />
    </AppProvider>
  );
}

export default App;
