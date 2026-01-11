// Messages.jsx
import { useState } from 'react';
import './Messages.css';

export function Messages({ todos, onDelete, onToggle, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id) => {
    onUpdate(id, editText);
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <p>No tasks yet. Add your first task above!</p>
        <p className="empty-hint">Tasks will appear here once you add them.</p>
      </div>
    );
  }

  return (
    <div className="messages-container">
      {todos.map(todo => (
        <div 
          key={todo.id} 
          className={`message-item ${todo.completed ? 'completed' : ''}`}
        >
          <div className="message-content">
            <div className="checkbox-wrapper">
              <input 
                type="checkbox" 
                className="message-checkbox" 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
              <div className="checkmark"></div>
            </div>
            
            {editingId === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <div className="edit-actions">
                  <button 
                    className="save-button"
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    Save
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-container">
                  <p className={`message-text ${todo.completed ? 'completed-text' : ''}`}>
                    {todo.text}
                  </p>
                  {todo.createdAt && (
                    <span className="timestamp">{todo.createdAt}</span>
                  )}
                </div>
                
                <div className="message-actions">
                  {!todo.completed && (
                    <button 
                      className="edit-button"
                      onClick={() => handleEditClick(todo)}
                    >
                      <span className="icon">✏️</span>
                    </button>
                  )}
                  <button 
                    className="delete-button"
                    onClick={() => onDelete(todo.id)}
                  >
                    <span className="icon">🗑️</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}