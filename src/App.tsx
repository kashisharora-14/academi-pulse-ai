import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import VerifyProfile from "./pages/VerifyProfile";
import NotFound from "./pages/NotFound";
import ChatbotFAB from './components/ChatbotFAB';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/institution" element={<InstitutionDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/verify/:code" element={<VerifyProfile />} />
          <Route path="/shared/:code" element={<VerifyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotFAB />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;