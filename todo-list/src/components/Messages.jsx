import "./Messages.css";

export function Messages() {
  return (
    <div className="messages-container">
      <div className="message-item">
        <div className="message-content">
          <input type="checkbox" className="message-checkbox" />
          <p className="message-text">This is the first todo item</p>
        </div>
        <div className="message-actions">
          <button className="edit-button">Edit</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>

      <div className="message-item">
        <div className="message-content">
          <input type="checkbox" className="message-checkbox" />
          <p className="message-text">This is the second todo item, This is the second todo item, This is the second todo item, This is the second todo item, This is the second todo item, This is the second todo item</p>
        </div>
        <div className="message-actions">
          <button className="edit-button">Edit</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
}
