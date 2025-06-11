import RouterProvider from "../routes";
import { UserADProvider } from "../context";

function App() {
  return (
    <UserADProvider>
      <RouterProvider />
    </UserADProvider>
  );
}

export default App;
