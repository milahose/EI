import React from 'react';

import './navigation-bar.css';

// The NavigationBar component goes here.  It should be the default export.

export default function NavigationBar(props) {
  console.log(props);
  const navItems = props.links.map(item => {
    return (
      <li>
        <a href={item.href}>{item.text}</a>
      </li>
    );
  });
  console.log('navItems', navItems);
  return (
    <div>
      <nav>
        <h1>{props.title}</h1>
        <ul>
          {navItems}
        </ul>
      </nav>
    </div>
  );
} 