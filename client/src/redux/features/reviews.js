const initialState = {
  items: [],
  loading: false,
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

    case "review/create/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
}

export const loadReviews = () => {
  return async (dispatch) => {
    dispatch({ type: "reviews/load/pending" });
    const responce = await fetch("http://localhost:4001/reviews");
    const json = await responce.json();
    dispatch({ type: "reviews/load/fulfilled", payload: json });
  };
};

export const addReview = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "reviews/load/pending" });
    const responce = await fetch(`http://localhost:4001/speaker/${id}/review`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await responce.json();
    dispatch({ type: "review/create/fulfilled", payload: json });
  };
};
