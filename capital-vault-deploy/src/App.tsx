import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import HvacLanding from "./pages/HvacLanding.tsx";
import SoftwareLanding from "./pages/SoftwareLanding.tsx";
import FundingFunnel from "./pages/FundingFunnel.tsx";
import Qualified from "./pages/Qualified.tsx";
import FounderTrack from "./pages/FounderTrack.tsx";
import CreditTrack from "./pages/CreditTrack.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const isHvac = hostname.startsWith("hvac.");
const isSoftware = hostname.startsWith("software.");
const isFund = hostname.startsWith("fund.");
const Home = isFund ? FundingFunnel : isHvac ? HvacLanding : isSoftware ? SoftwareLanding : Index;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qualified" element={<Qualified />} />
          <Route path="/founder-track" element={<FounderTrack />} />
          <Route path="/credit-track" element={<CreditTrack />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
