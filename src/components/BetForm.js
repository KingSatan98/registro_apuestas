var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Tesseract from 'tesseract.js';
var userTypes = ['Staker', 'Tipster', 'Betburger'];
var BetForm = function () {
    var _a = useState(null), submitStatus = _a[0], setSubmitStatus = _a[1];
    var _b = useState([]), recentBets = _b[0], setRecentBets = _b[1];
    var _c = useForm(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors, reset = _c.reset, setValue = _c.setValue;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formattedData_1, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    formattedData_1 = {
                        match: data.match.trim(),
                        bet_type: data.bet_type.trim(),
                        odds: Number(data.odds),
                        bank: Number(data.bank),
                        type: data.type,
                        determination: data.determination // Nuevo campo
                    };
                    return [4 /*yield*/, axios.post('https://hook.eu2.make.com/r0sd56dn2exc4akaprmpwqf3a9cs5nru', formattedData_1, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    setRecentBets(function (prev) { return __spreadArray([formattedData_1], prev, true).slice(0, 5); });
                    setSubmitStatus('success');
                    reset();
                    setTimeout(function () {
                        setSubmitStatus(null);
                    }, 3000);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    setSubmitStatus('error');
                    setTimeout(function () {
                        setSubmitStatus(null);
                    }, 3000);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleFileChange = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var file, reader_1;
        var _a;
        return __generator(this, function (_b) {
            file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                reader_1 = new FileReader();
                reader_1.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, text, match, bet_type, odds, bank, type, determination;
                    var _a, _b, _c, _d, _e, _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0: return [4 /*yield*/, Tesseract.recognize(reader_1.result, 'eng')];
                            case 1:
                                result = _g.sent();
                                text = result.data.text;
                                match = (_a = text.match(/Match: (.+)/)) === null || _a === void 0 ? void 0 : _a[1];
                                bet_type = (_b = text.match(/Bet Type: (.+)/)) === null || _b === void 0 ? void 0 : _b[1];
                                odds = (_c = text.match(/Odds: (.+)/)) === null || _c === void 0 ? void 0 : _c[1];
                                bank = (_d = text.match(/Bank: (.+)/)) === null || _d === void 0 ? void 0 : _d[1];
                                type = (_e = text.match(/Type: (.+)/)) === null || _e === void 0 ? void 0 : _e[1];
                                determination = (_f = text.match(/Determination: (.+)/)) === null || _f === void 0 ? void 0 : _f[1];
                                if (match)
                                    setValue('match', match);
                                if (bet_type)
                                    setValue('bet_type', bet_type);
                                if (odds)
                                    setValue('odds', Number(odds));
                                if (bank)
                                    setValue('bank', Number(bank));
                                if (type)
                                    setValue('type', type);
                                if (determination)
                                    setValue('determination', determination);
                                return [2 /*return*/];
                        }
                    });
                }); };
                reader_1.readAsDataURL(file);
            }
            return [2 /*return*/];
        });
    }); };
    return (_jsxs("div", __assign({ className: "max-w-2xl mx-auto p-6" }, { children: [_jsxs("form", __assign({ onSubmit: handleSubmit(onSubmit), className: "space-y-6" }, { children: [_jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Upload Screenshot" })), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" })] }), _jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Match" })), _jsx("input", __assign({ type: "text" }, register('match', { required: 'Match is required' }), { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border", placeholder: "Example FC vs Demo United" })), errors.match && (_jsx("p", __assign({ className: "mt-1 text-sm text-red-600" }, { children: errors.match.message })))] }), _jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Bet Type" })), _jsx("input", __assign({ type: "text" }, register('bet_type', { required: 'Bet type is required' }), { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border", placeholder: "Enter your bet type" })), errors.bet_type && (_jsx("p", __assign({ className: "mt-1 text-sm text-red-600" }, { children: errors.bet_type.message })))] }), _jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Odds" })), _jsx("input", __assign({ type: "number", step: "0.01" }, register('odds', {
                                required: 'Odds are required',
                                min: { value: 1, message: 'Odds must be greater than 1' },
                                pattern: { value: /^\d*\.?\d*$/, message: 'Please enter a valid number' }
                            }), { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border", placeholder: "2.35" })), errors.odds && (_jsx("p", __assign({ className: "mt-1 text-sm text-red-600" }, { children: errors.odds.message })))] }), _jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Bank" })), _jsx("input", __assign({ type: "number" }, register('bank', {
                                required: 'Bank is required',
                                min: { value: 1, message: 'Bank must be greater than 0' }
                            }), { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border", placeholder: "100" })), errors.bank && (_jsx("p", __assign({ className: "mt-1 text-sm text-red-600" }, { children: errors.bank.message })))] }), _jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Type" })), _jsxs("select", __assign({}, register('type', { required: 'Type is required' }), { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" }, { children: [_jsx("option", __assign({ value: "" }, { children: "Select type" })), userTypes.map(function (type) { return (_jsx("option", __assign({ value: type }, { children: type }), type)); })] })), errors.type && (_jsx("p", __assign({ className: "mt-1 text-sm text-red-600" }, { children: errors.type.message })))] }), _jsxs("div", { children: [_jsx("label", __assign({ className: "block text-sm font-medium text-gray-700" }, { children: "Determination" })), _jsxs("select", __assign({}, register('determination', { required: 'Determination is required' }), { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" }, { children: [_jsx("option", __assign({ value: "GANADA" }, { children: "GANADA" })), _jsx("option", __assign({ value: "PERDIDA" }, { children: "PERDIDA" })), _jsx("option", __assign({ value: "NULA" }, { children: "NULA" })), _jsx("option", __assign({ value: "PENDIENTE" }, { children: "PENDIENTE" }))] })), errors.determination && (_jsx("p", __assign({ className: "mt-1 text-sm text-red-600" }, { children: errors.determination.message })))] }), _jsx("button", __assign({ type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" }, { children: "Submit Bet" })), submitStatus === 'success' && (_jsxs("div", __assign({ className: "flex items-center gap-2 text-green-600" }, { children: [_jsx(CheckCircleIcon, { className: "h-5 w-5" }), _jsx("span", { children: "Bet successfully sent!" })] }))), submitStatus === 'error' && (_jsxs("div", __assign({ className: "flex items-center gap-2 text-red-600" }, { children: [_jsx(ExclamationCircleIcon, { className: "h-5 w-5" }), _jsx("span", { children: "Error submitting bet. Please try again." })] })))] })), recentBets.length > 0 && (_jsxs("div", __assign({ className: "mt-8" }, { children: [_jsx("h2", __assign({ className: "text-lg font-medium text-gray-900 mb-4" }, { children: "Recent Bets" })), _jsx("div", __assign({ className: "space-y-4" }, { children: recentBets.map(function (bet, index) { return (_jsxs("div", __assign({ className: "bg-gray-50 p-4 rounded-lg" }, { children: [_jsx("p", __assign({ className: "font-medium" }, { children: bet.match })), _jsxs("div", __assign({ className: "mt-1 text-sm text-gray-500" }, { children: [_jsxs("p", { children: ["Type: ", bet.type, " | Bet Type: ", bet.bet_type] }), _jsxs("p", { children: ["Odds: ", bet.odds, " | Bank: ", bet.bank] }), _jsxs("p", { children: ["Determination: ", bet.determination] }), " "] }))] }), index)); }) }))] })))] })));
};
export default BetForm;
