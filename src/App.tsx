import { Suspense } from "react";

import { Helmet } from "react-helmet";
import Routes from "./app/pages/routes";

import '@fortawesome/fontawesome-free/css/all.css';

export default function App({ toggleTheme }) {
  return (
    <>
      <Helmet>
        <title>Новий заголовок сторінки</title>
      </Helmet>
      <Suspense fallback={<>loading...</>}>
        <Routes />
      </Suspense>
    </>
  );
}
