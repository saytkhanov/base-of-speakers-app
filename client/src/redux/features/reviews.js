const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "reviews/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "reviews/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "reviews/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "review/create/pending":
      return {
        ...state,
        loading: true,
      };

    case "review/create/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };

    case "review/create/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export const loadReviews = () => {
  return async (dispatch) => {
    dispatch({ type: "reviews/load/pending" });
    const response = await fetch("http://localhost:4001/reviews");
    const json = await response.json();
    if (json.error) {
      dispatch({
        type: "reviews/load/rejected",
        error: json.error,
      });
    } else {
      dispatch({ type: "reviews/load/fulfilled", payload: json });
    }
  };
};

export const addReview = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "reviews/load/pending" });
    const response = await fetch(`/speaker/${id}/review`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.error) {
      dispatch({
        type: "reviews/create/rejected",
        error: json.error,
      });
    } else {
      dispatch({ type: "review/create/fulfilled", payload: json });
    }
  };
};
