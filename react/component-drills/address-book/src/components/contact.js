import React from 'react';

import './contact.css';

export default function Contact(props) {
    return (
        <section id={`contact-${props.index}`} className="contact">
            <img
                className="contact-photo"
                src={props.photo}
                alt={`${props.name}'s avatar`}
            />
            <h2 className="contact-name">{props.name}</h2>
            <address className="contact-address">{props.address}</address>
        </section>
    );
}
