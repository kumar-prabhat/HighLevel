import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Wallet from "../components/Wallet";
import Transaction from "../components/Transaction";
import NotFound from "../components/common/NotFound";

const AppRoutes = () => {
  return (
    <section className="container form-box">
      <Routes>
        <Route path="/" element={<Navigate to="/wallet" />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default AppRoutes;
