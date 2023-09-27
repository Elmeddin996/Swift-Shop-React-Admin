import { QueryClient, QueryClientProvider } from "react-query";
import "./App.scss";
import { AdminRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App:React.FC=()=>{
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
