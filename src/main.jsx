import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

const MIN_LOADER_TIME = 800;
const loaderStart = performance.now();

function hideBootLoader() {
  const loader = document.getElementById("boot-loader");
  if (!loader) return;
  const elapsed = performance.now() - loaderStart;
  const wait = Math.max(0, MIN_LOADER_TIME - elapsed);
  setTimeout(() => {
    loader.classList.add("boot-loader-hide");
    setTimeout(() => loader.remove(), 400);
  }, wait);
}

if (document.readyState === "complete") {
  hideBootLoader();
} else {
  window.addEventListener("load", hideBootLoader);
}
