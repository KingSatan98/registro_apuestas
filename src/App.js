import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Statistics from './components/Statistics';
import AdminPanel from './components/AdminPanel';
var App = function () {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPanel, {}) }), _jsx(Route, { path: "/", element: _jsx(Statistics, {}) })] }) }));
};
export default App;
