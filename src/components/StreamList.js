import React, { useState } from 'react';

function StreamList() {
    const [input, setinput] = useState('');
    const [list, setList] = useState([]);

    const handleAdd = () => {
        if (input.trim() !== '') {
            console.log('Added to StreamList:', input);
            setList([...list, input]);
            setinput('');
        }
    };

    return (
        <div className="streamlist-container">
            <h2>My StreamList</h2>
            <p>Add movies or shows you want to watch.</p>
            <div className="streamlist-input">
                <input  
                type="text"
                placeholder="Enter a movie or show..."
                value={input}
                onChange={(e) => setinput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
            </div>
            <ul>
                {list.map((item,index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default StreamList;