import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import ContextProvider from "./Context/ContextProvider";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={"loading"}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </Suspense>
    </>
  );
}

export default App;
