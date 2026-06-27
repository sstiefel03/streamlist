import React from 'react';

function About() {
    return (
        <div className ="about-page">
            <h2>About StreamList</h2>
            <p>
                StreamList is a personal watchlist app built for users 
                who want an easy way to discover, track, and organize
                the movies and shows they want to watch. Browse new 
                releases, search, and keep a list saved right in 
                the browser.
            </p>
            <h3>Features</h3>
            <ul className="about-features">
                <li>Live movie and show data by The Movie Database (TMDB)API</li>
                <li>Personal watchlist with automatic saving</li>
                <li>Shopping cart with subscription management and merch</li>
                <li>Installable as a desktop app with offline support (PWA)</li>
            </ul>
            <h3>Built with</h3>
            <p>React, React Router, and using the TMDB API.</p>
        </div>
    )
}

export default About;