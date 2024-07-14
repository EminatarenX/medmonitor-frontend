import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes";
import { ToastContainer } from "react-toastify";
import { toastStyles } from "./services/alerts/tastify.styles";
import { Fragment, useEffect } from "react";
import "react-toastify/ReactToastify.css";
import { SocketProvider } from "./stores/ws/websocket";

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <Fragment>
      <SocketProvider>
      <RouterProvider router={appRouter} />
      <ToastContainer {...toastStyles} />
      </SocketProvider>
    </Fragment>
  );
}

export default App;
