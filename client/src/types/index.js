import {
  shape,
  number,
  string,
  arrayOf,
  bool,
  func,
  date,
} from 'prop-types';

export const MenuProps = {
  showMenu: bool.isRequired,
  setShowLogModal: func.isRequired,
  setShowRegModal: func.isRequired,
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

export const DefaultMenuProps = {
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

export const NavBarProps = {
  showMenu: bool.isRequired,
  setShowMenu: func.isRequired,
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
            userID: string,
            comment: string,
            date,
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
        userID: string,
        comment: string,
        date,
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