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
import { Chatbot } from './components/Chatbot';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter 
        future={{ 
          v7_startTransition: true, 
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true
        }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/institution" element={<InstitutionDashboard />} />
          <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/chatbot" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl">
                <Chatbot />
              </div>
            </div>
          } />
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