import React from 'react';

import './navigation-bar.css';

export default function NavigationBar(props) {
    const links = props.links.map((link, idx) => (
        <li key={idx}>
            <a href={link.href}>{link.text}</a>
        </li>
    ));

    return (
        <div className="navigation-bar">
            <h1>{props.title}</h1>
            <nav className="navigation-bar-nav">
                <ul>
                    {links}
                </ul>
            </nav>
        </div>
    );
}
