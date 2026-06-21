import React, { useState, useEffect } from 'react';

function StreamList() {
    const [input, setInput] = useState('');
    const [list, setList] = useState(() => {
        try {
            const saved = localStorage.getItem('streamlist');
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            console.error('Failed to load StreamList from localStorage:', err);
            return[];
        }
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        localStorage.setItem('streamlist', JSON.stringify(list));
    }, [list]);

    const handleAdd = () => {
        if (input.trim() !== '') {
            setList([...list, {id: crypto.randomUUID(), title: input, completed: false}]);
            setInput('');
        }
    };

    const handleDelete = (index) => {
        setList(list.filter((_, i) => i !== index));
    }

    const handleComplete = (index) => {
        const updated = list.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setList(updated);
    }

    const handleEditStart = (index) => {
        setEditIndex(index);
        setEditValue(list[index].title);
    };

    const handleEditSave = (index) => {
        if (editValue.trim() !== '') {
            const updated = list.map((item, i) =>
                i === index ? { ...item, title: editValue } : item
            );
            setList(updated);
        }
        setEditIndex(null);
        setEditValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
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
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleAdd}>Add</button>
            </div>
        {list.length === 0 ? (
            <p>Your StreamList is empty. Add a movie or show to get started.</p>
        ) : (
            <ul>
                {list.map((item,index) => (
                    <li key={item.id} className={item.completed ? 'completed' : ''}>
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
        )}    
        </div>
    );
}

export default StreamList;