import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { store } from "./store/store.js";

// pages
import { HomePage } from "./pages/HomePage";
import { BoardIndex } from "./pages/BoardIndex.jsx";
import { BoardDetails } from "./pages/BoardDetails.jsx";
// import { CrudlIndex } from "./pages/CrudlIndex";
// import { CrudleDetails } from "./pages/CrudleDetails.jsx";
// import { CrudleEdit } from "./pages/CrudleEdit.jsx";

//cmps
import { AppHeader } from "./cmps/AppHeader";
import { AsideMenu } from "./cmps/AsideMenu.jsx";

export function RootCmp(props) {
    return (
        <Provider store={store}>
            <Router>
                <section className="main-container">
                    <AppHeader />
                    <aside className="site-aside">
                        <AsideMenu />
                    </aside>
                    <main className="site-main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/board" element={<BoardIndex />} />
                            <Route path="/board/:boardId" element={<BoardDetails />} />
                            {/* <Route path="/index/:objectId" element={<CrudleDetails />} />
                            <Route path="/index/edit" element={<CrudleEdit />} />
                            <Route path="/index/edit/:objectId" element={<CrudleEdit />} /> */}
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}