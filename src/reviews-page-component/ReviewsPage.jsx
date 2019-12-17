import React from "react";
import { string } from "prop-types";
import Comment from "../comment-component/Comment";
import CommentEditor from "../comment-editor-component/CommentEditor";
import CommentsStorageService from "../commentsStorageService.js";
import imgGen from "@dudadev/random-img";
import "./ReviewsPage.scss";

class ReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    const comments = CommentsStorageService.getAllComments();
    this.state = { comments, commentsInEditMode: [] };
  }

  onNewComment = commentData => {
    imgGen().then(avatarUrl => {
      commentData.avatarUrl = avatarUrl;
      const comments = CommentsStorageService.addComment(commentData);
      this.setState({ comments });
    });
  };

  onCommentEditClicked = commentId => {
    const { commentsInEditMode } = this.state;

    if (!commentsInEditMode.includes(commentId)) {
      this.setState({ commentsInEditMode: [...commentsInEditMode, commentId] });
    }
  };

  onCommentSaved = (commentId, newCommentData) => {
    const { comments, commentsInEditMode } = this.state;

    const currentCommentData = comments[commentId];
    const newComments = CommentsStorageService.editComment(commentId, {
      ...currentCommentData,
      ...newCommentData
    });
    const newCommentsInEditMode = [...commentsInEditMode];
    const commentIndex = newCommentsInEditMode.indexOf(commentId);
    if (commentIndex !== -1) newCommentsInEditMode.splice(commentIndex, 1);

    this.setState({
      comments: newComments,
      commentsInEditMode: newCommentsInEditMode
    });
  };

  onCommentDelete = commentId => {
    const comments = CommentsStorageService.deleteComment(commentId);
    this.setState({ comments });
  };

  renderComment(comment) {
    const { commentsInEditMode } = this.state;
    const { id: commentId, publisherName, content, avatarUrl } = comment;

    if (commentsInEditMode.includes(commentId)) {
      return (
        <CommentEditor
          key={commentId}
          saveButtonText="Save"
          publisherName={publisherName}
          content={content}
          onCommentSaved={commentData =>
            this.onCommentSaved(commentId, commentData)
          }
        />
      );
    }

    return (
      <Comment
        key={commentId}
        publisherName={publisherName}
        content={content}
        avatarUrl={avatarUrl}
        onEdit={() => this.onCommentEditClicked(commentId)}
        onDelete={() => this.onCommentDelete(commentId)}
      />
    );
  }

  render() {
    const { comments } = this.state;
    const commentsArray = Object.keys(comments).map(commentId => ({
      id: commentId,
      ...comments[commentId]
    }));

    return (
      <div className="reviews-page">
        <div className="title">User Reviews</div>
        <div className="comments-container">
          {commentsArray.map(comment => this.renderComment(comment))}
          <CommentEditor
            saveButtonText="Add"
            onCommentSaved={this.onNewComment}
          />
        </div>
      </div>
    );
  }
}

export default ReviewsPage;
