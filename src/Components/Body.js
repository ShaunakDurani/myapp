import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute>
          <AppLayout>
            <Browse />
          </AppLayout>
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
