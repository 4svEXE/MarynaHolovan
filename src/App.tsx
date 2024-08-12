import { Suspense } from "react";
import Routes from "./app/pages/routes";
import '@fortawesome/fontawesome-free/css/all.css';

export default function App() {
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <Routes />
      </Suspense>
    </>
  );
}
