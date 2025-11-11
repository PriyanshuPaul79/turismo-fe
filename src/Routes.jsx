import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Dashboard from './pages/dashboard';
import EventsPage from './pages/events';
import ItineraryBuilder from './pages/itinerary-builder';
import ExplorePage from './pages/explore';
import DestinationDetail from './pages/destination-detail';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/destination-detail" element={<DestinationDetail />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
