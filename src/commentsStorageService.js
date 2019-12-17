const DUDA_COMMENTS_KEY = "dudaComments";
const NEXT_COMMENT_ID_KEY = "nextCommentId";

class CommentsStorageService {
  static getAllComments() {
    const commentsDataStr = localStorage.getItem(DUDA_COMMENTS_KEY);
    const commentsData = JSON.parse(commentsDataStr) || {};

    return commentsData;
  }

  static addComment(commentData) {
    let nextCommentId = localStorage.getItem(NEXT_COMMENT_ID_KEY);
    if (nextCommentId) {
      nextCommentId = parseInt(nextCommentId);
    } else {
      initCommentsStore();
      nextCommentId = 0;
    }
    localStorage.setItem(NEXT_COMMENT_ID_KEY, nextCommentId + 1);

    return this.editComment(nextCommentId, commentData);
  }

  static editComment(commentId, commentData) {
    const commentsDataStr = localStorage.getItem(DUDA_COMMENTS_KEY);
    const commentsData = JSON.parse(commentsDataStr);

    commentsData[commentId] = commentData;

    localStorage.setItem(DUDA_COMMENTS_KEY, JSON.stringify(commentsData));

    return commentsData;
  }

  static deleteComment(commentId) {
    const commentsDataStr = localStorage.getItem(DUDA_COMMENTS_KEY);
    const commentsData = JSON.parse(commentsDataStr);

    delete commentsData[commentId];

    localStorage.setItem(DUDA_COMMENTS_KEY, JSON.stringify(commentsData));

    return commentsData;
  }
}

function initCommentsStore() {
  localStorage.setItem(NEXT_COMMENT_ID_KEY, 0);
  localStorage.setItem(DUDA_COMMENTS_KEY, JSON.stringify({}));
}

export default CommentsStorageService;
