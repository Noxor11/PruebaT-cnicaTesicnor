import { createBrowserRouter } from "react-router-dom";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";
import MovieList from "./pages/MovieList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieList />
  },
  {
    path: "/movies/:id",
    element: <Movie />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
