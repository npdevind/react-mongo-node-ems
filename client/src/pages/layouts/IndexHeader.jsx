import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./indexLayout.scss";
import { FaBars } from "react-icons/fa";
import { Offcanvas } from "react-bootstrap";

const IndexHeader = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <nav className="navbar  index_nav_bar" style={{ position: "fixed", width: "100%" }}>
                <div className="container">
                    <div className="text-dark header_name">TeamBook</div>
                    <div className="justify-content-md-end header_nav_link">
                        <div className="header-link">
                            <Link className="nav_link" to="">
                                Home
                            </Link>
                            <Link className="nav_link" to="/blog">
                                Blog
                            </Link>
                            <Link className="nav_link" to="/login">
                                Login
                            </Link>
                        </div>
                        <div className="header_link_media">
                            <button className="btn btn-sm btn-light">
                                <FaBars onClick={handleShow} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="header_off_canvas">
                <Offcanvas show={show} onHide={handleClose} placement="top" style={{}}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default IndexHeader;
