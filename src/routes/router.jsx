import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import CreatePostPage from "@/pages/CreatePostPage";
import PostDetailPage from "@/pages/PostDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreatePostPage /> },
      { path: "posts/:postId", element: <PostDetailPage /> },
    ],
  },
]);

export default router;
