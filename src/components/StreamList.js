import React, { useState } from 'react';

function StreamList() {
    const [input, setinput] = useState('');
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleAdd = () => {
        if (input.trim() !== '') {
            console.log('Added to StreamList:', input);
            setList([...list, { title: input, completed: false}]);
            setinput('');
        }
    };

    const handleDelete = (index) => {
        setList(list.filter((_, i) => i !== index));
    }

    const handleComplete = (index) => {
        const updated = [...list];
        updated[index].completed = !updated[index].completed;
        setList(updated);
    }

    const handleEditStart = (index) => {
        setEditIndex(index);
        setEditValue(list[index].title);
    };

    const handleEditSave = (index) => {
        if (editValue.trim() !== '') {
            const updated = [...list];
            updated[index].title = editValue;
            setList(updated);
        }
        setEditIndex(null);
        setEditValue('');
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
                    <li key={index} className={item.completed ? 'completed' : ''}>
                        {editIndex === index ? (
                            <div>
                                <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => handleEditSave(index)}>
                                    <span className="material-icons">check</span>
                                </button>
                            </div>
                        ) : (
                            <div className="list-item-content">
                                <span className="item-title">{item.title}</span>
                                <div className="item-actions">
                                    <button className="complete-btn" onClick={() => handleComplete(index)}>
                                        <span className="material-icons">visibility</span>
                                    </button>
                                    <button className="edit-btn" onClick={() => handleEditStart(index)}>
                                        <span className="material-icons">edit</span>
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(index)}>
                                        <span className="material-icons">delete</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StreamList;