const initialState = {
  counts: {
    error: false,
    message: null,
    isLoading: true,
    CurrentPage: null,
    Data: null,
    PageSize: null,
    TotalCount: null,
    TotalPages: null,
  },
}

export default function requestCount(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_REQUESTS_COUNT_SUCCESS':
      return {
        ...state,
        counts: {
          error: false,
          data: action.payload.data,
          message: action.payload.message,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          isLoading: false
        }
      }
    case 'FETCH_REQUESTS_COUNT_FAILED':
      return {
        ...state,
        counts: {
          ...state.counts,
          error: true,
          message: action.payload.message,
          isLoading: false
        }
      }
    default:
      return {
        ...state
      }
  }
}