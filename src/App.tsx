import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

// Configure React Query for optimal data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Only refetch data when requested
      staleTime: 30000, // Consider data fresh for 30 seconds
      retry: 2, // Retry failed requests twice
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/trending" 
            element={
              <Layout>
                <TrendingPosts />
              </Layout>
            } 
          />
          <Route 
            path="/feed" 
            element={
              <Layout>
                <Feed />
              </Layout>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
