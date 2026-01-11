// InputBox.jsx
import './InputBox.css';

export function InputBox({ value, onChange, onAdd, onClearCompleted, hasCompletedTodos }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-group">
          <input
            type="text"
            className="text-input"
            placeholder="What needs to be done?..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            type="submit" 
            className="add-button"
            disabled={!value.trim()}
          >
            <span className="button-text">Add Task</span>
            <span className="button-icon">➕</span>
          </button>
        </div>
        
        <div className="input-hint">
          Press Enter to add quickly
        </div>
      </form>
      
      {hasCompletedTodos && (
        <div className="clear-section">
          <button 
            className="clear-button"
            onClick={onClearCompleted}
          >
            Clear Completed Tasks
          </button>
        </div>
      )}
    </div>
  );
}