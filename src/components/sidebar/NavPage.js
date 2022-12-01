import React from "react";
import { Routes, Route } from "react-router-dom";
import Words from "../../pages/admin/Words";
import Tags from "../../pages/admin/Tags";
import Categories from "../../pages/admin/Categories";

const NavPage = () => {
  return (
    <>
      <section>
        <Routes>
        <Route path="/ad" element={<Words />} />
        <Route path="/ad/words" element={<Words />} />
        <Route path="/ad/tags" element={<Tags />} />
        <Route path="/ad/categories" element={<Categories/>} />
        </Routes>
      </section>
    </>
  );
};

export default NavPage;