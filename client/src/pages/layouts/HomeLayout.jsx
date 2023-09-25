import React from "react";
import IndexHeader from "./IndexHeader";
import { Outlet } from "react-router-dom";
import IndexFooter from "./IndexFooter";

const HomeLayout = () => {
    return (
        <>
            <IndexHeader />
            <Outlet />
            {/* <IndexFooter /> */}
        </>
    );
};

export default HomeLayout;
