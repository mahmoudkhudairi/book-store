import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addComment, getComments, updateComment, deleteComment } from './actions/comment';
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    count: 0,
    error: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        addComment.pending,
        getComments.pending,
        updateComment.pending,
        deleteComment.pending,
      ),
      (state, { type, payload, meta }) => {
        if (meta?.arg?.page === 0) {
          return { ...state, loading: true, error: null, comments: [], count: 0 };
        } else {
          return { ...state, loading: true, error: null };
        }
      },
    );
    builder.addMatcher(
      isAnyOf(
        addComment.fulfilled,
        getComments.fulfilled,
        updateComment.fulfilled,
        deleteComment.fulfilled,
      ),
      (state, { type, payload }) => {
        switch (type) {
          case 'comments/add/fulfilled':
            return {
              ...state,
              loading: false,
              success: true,
              comments: [payload, ...state.comments],
              count: state.count + 1,
            };
          case 'comments/get-all/fulfilled':
            return {
              ...state,
              loading: false,
              success: true,
              comments: [...state.comments, ...payload.comments],
              count: payload.commentsCount,
            };
          case 'comments/delete/fulfilled':
            return {
              ...state,
              loading: false,
              success: true,
              comments: state.comments.filter(comment => comment._id !== payload._id),
              count: state.count - 1,
            };
          case 'comments/update/fulfilled':
            const newComment = state.comments.map(comment => {
              if (comment._id === payload._id) {
                return payload;
              } else {
                return comment;
              }
            });
            return { ...state, loading: false, success: true, comments: newComment };
          default:
            return state;
        }
      },
    );
    builder.addMatcher(
      isAnyOf(
        addComment.rejected,
        getComments.rejected,
        updateComment.rejected,
        deleteComment.rejected,
      ),
      (state, { payload }) => {
        if (payload) {
          state = { ...state, error: { message: payload.message, errors: payload.errors } };
        }
        return {
          ...state,
          loading: false,
          success: false,
        };
      },
    );
  },
});

export default commentSlice.reducer;
