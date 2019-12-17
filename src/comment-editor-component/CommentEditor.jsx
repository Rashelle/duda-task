import React from "react";
import { string } from "prop-types";
import "./CommentEditor.scss";

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);

    const { publisherName, content } = this.props;
    this.state = {
      publisherName,
      content
    };
  }

  onSave = () => {
    const { publisherName, content } = this.state;
    if (publisherName == "" || content == "") return;

    this.props.onCommentSaved({ publisherName, content });
    this.setState({ publisherName: "", content: "" });
  };

  onNameChange = e => {
    this.setState({ publisherName: e.target.value });
  };

  onContentChange = e => {
    this.setState({ content: e.target.value });
  };

  render() {
    const { saveButtonText } = this.props;
    const { publisherName, content } = this.state;

    return (
      <div className="comment-editor-container">
        <input
          className="name-input"
          placeholder="Your name"
          value={publisherName}
          onChange={this.onNameChange}
        />
        <textarea
          className="content-input"
          placeholder="Your comment"
          value={content}
          onChange={this.onContentChange}
        />
        <button className="add-button" onClick={this.onSave}>
          {saveButtonText}
        </button>
      </div>
    );
  }
}

Comment.propTypes = {
  publisherName: string,
  content: string,
  saveButtonText: string
};

CommentEditor.defaultProps = {
  publisherName: "",
  content: ""
};

export default CommentEditor;
