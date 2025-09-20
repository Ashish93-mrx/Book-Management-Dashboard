import { Routes, Route } from "react-router-dom";
import { Container, CssBaseline, AppBar, Toolbar, Typography, Box, CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";

// Lazy load the Dashboard page
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Books Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, my: 2 }}>
        {/* Wrap routes in Suspense */}
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
            >
              <CircularProgress color="primary" />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}