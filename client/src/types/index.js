import {
  shape,
  number,
  string,
  arrayOf,
  bool,
  func,
} from 'prop-types';

export const NavBarProps = {
  auth: shape({
    token: string,
    isAuthenticated: bool,
    isLoading: bool,
    user: shape({
      id: string,
      posts: arrayOf(string),
      likedPosts: arrayOf(string),
      username: string,
      email: string,
    }),
  }),
  logout: func.isRequired,
};

export const DefaultNavBarProps = {
  auth: {
    token: null,
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
};

export const LogModalProps = {
  showLogModal: bool.isRequired,
  setShowLogModal: func.isRequired,
  isAuthenticated: bool,
  login: func.isRequired,
  clearErrors: func.isRequired,
  error: shape({
    msg: shape({
      err: string,
    }),
    status: number,
    id: string,
  }),
};

export const DefaultLogModalProps = {
  isAuthenticated: null,
  error: null,
};

export const RegModalProps = {
  showRegModal: bool.isRequired,
  setShowRegModal: func.isRequired,
  isAuthenticated: bool,
  register: func.isRequired,
  clearErrors: func.isRequired,
  error: shape({
    msg: shape({
      err: string,
    }),
    status: number,
    id: string,
  }),
};

export const DefaultRegModalProps = {
  isAuthenticated: null,
  error: null,
};

export const DiscoverProps = {
  getPosts: func.isRequired,
  posts: shape({
    isLoading: bool,
    posts: arrayOf(
      shape({
        id: string,
        date: string,
        numOfLikes: number,
        comment: arrayOf(
          shape({
            commentID: string,
            comment: string,
            date: string,
            username: string,
          }),
        ),
        title: string,
        userID: string,
        link: string,
        tag: string,
      }),
    ),
  }),
};

export const DefaultDiscoverProps = {
  posts: shape({
    isLoading: false,
    posts: [],
  }),
};

export const PostProps = {
  post: shape({
    id: string,
    date: string,
    numOfLikes: number,
    comments: arrayOf(
      shape({
        commentID: string,
        comment: string,
        date: string,
        username: string,
      }),
    ),
    title: string,
    userID: string,
    link: string,
    tag: string,
  }),
  likedPosts: arrayOf(string),
};

export const DefaultPostProps = {
  post: {},
  likedPosts: [],
};

export const LikeProps = {
  numOfLikes: number.isRequired,
  liked: bool.isRequired,
  id: string.isRequired,
  unlikePost: func,
  isAuthenticated: bool,
};

export const DefaultLikeProps = {
  unlikePost: null,
  isAuthenticated: null,
};

export const CommentIconProps = {
  handleOpenComments: func.isRequired,
  commentCount: number.isRequired,
};

export const PostDateProps = {
  datePosted: string.isRequired,
};

export const CommentProps = {
  comment: shape({
    comment: string.isRequired,
    commentID: string.isRequired,
    date: string.isRequired,
    username: string.isRequired,
  }),
};
