import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Analytics,
  AppLayout,
  AuthLayout,
  CreateQuiz,
  Dashboard,
  HomeLayout,
  NotFound,
  Quiz,
  QuizAnalysis,
} from "./pages";
import {
  Error,
  Login,
  ProtectedRoute,
  QuestionEditForm,
  QuestionsForm,
  QuizCreationFinalPage,
  QuizDetailsForm,
  Signup,
} from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { action as loginAction } from "./components/Login";
import { action as signupAction } from "./components/Signup";
import { loader as authLoader } from "./pages/AppLayout";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Signup />,
            action: signupAction,
          },
          {
            path: "login",
            element: <Login />,
            action: loginAction(queryClient),
          },
        ],
      },
      {
        path: "quiz/:quizId",
        element: <Quiz />,
      },
      {
        path: "dashboard",
        element: <AppLayout queryClient={queryClient} />,
        loader: authLoader(queryClient),

        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "create-quiz",
            element: <CreateQuiz />,
            children: [
              {
                index: true,
                element: <QuizDetailsForm />,
              },
              {
                path: "question",
                element: <QuestionsForm />,
              },
              {
                path: "finish/:newQuizId",
                element: <QuizCreationFinalPage />,
              },
            ],
          },
          {
            path: "quiz-analysis/:quizId",
            element: <QuizAnalysis />,
          },
          {
            path: "edit-quiz/:quizId",
            element: <QuestionEditForm />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
