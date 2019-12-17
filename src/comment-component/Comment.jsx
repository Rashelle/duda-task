import React from "react";
import { string } from "prop-types";
import editIcon from "../icons/pen-square-solid.svg";
import deleteIcon from "../icons/trash-alt-solid.svg";
import "./Comment.scss";

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { publisherName, content, onDelete, onEdit, avatarUrl } = this.props;
    return (
      <div className="comment-container">
        <img className="publisher-avatar" src={avatarUrl}></img>
        <div className="comment-details">
          <div className="comment-publisher">{publisherName}</div>
          <div className="comment-content">{content}</div>
        </div>
        <span className="comment-actions">
          <img className="edit-button" src={editIcon} onClick={onEdit} />
          <img className="delete-button" src={deleteIcon} onClick={onDelete} />
        </span>
      </div>
    );
  }
}

Comment.propTypes = {
  publisherName: string,
  content: string,
  avatarUrl: string
};

export default Comment;
