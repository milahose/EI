import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/navigation-bar';
import './index.css';

const links = [{
    text: 'Courses',
    href: 'http://www.thinkful.com/courses/'
}, {
    text: 'Mentorship',
    href: 'http://www.thinkful.com/mentorship/'
}];

ReactDOM.render(
  <NavigationBar title="Thinkful" links={links} />,
  document.getElementById('root')
);
