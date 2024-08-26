import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import ContextProvider from "./Context/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </>
  );
}

export default App;
