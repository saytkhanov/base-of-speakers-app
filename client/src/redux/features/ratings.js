const initialState = {
    items: [],
    loading: false,
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case "ratings/load/pending":
        return {
          ...state,
          loading: true,
        };
  
      case "ratings/load/fulfilled":
        return {
          ...state,
          items: action.payload,
          loading: false,
        };
  
      case "ratings/create/fulfilled":
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case "ratingsBySort/load/pending":
        return {
          ...state,
          loading: true,
        };

      case "ratingsBySort/load/fulfilled":
        return {
          ...state,
          items: action.payload,
          loading: false,
        };

      case "ratingsBySort/load/rejected":
        return {
          ...state,
          items: action.payload,
        };
      default:
        return state;
    }
  }

  export const loadRatings = () => {
    return async (dispatch) => {
      dispatch({ type: "ratings/load/pending" });
      const response = await fetch("http://localhost:4001/rating");
      const json = await response.json();
      dispatch({ type: "ratings/load/fulfilled", payload: json });
    };
  };

  export const addRating = (id, data) => {
    return async (dispatch) => {
      dispatch({ type: "ratings/load/pending" });
      const response = await fetch(`http://localhost:4001/rating/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      dispatch({ type: "ratings/create/fulfilled", payload: json });
    };
  };

export const loadRatingsBySort = () => {
  return async (dispatch) => {
    dispatch({ type: "ratingsBySort/load/pending" });
    const response = await fetch("http://localhost:4001/sort");
    const json = await response.json();
    dispatch({ type: "ratingsBySort/load/fulfilled", payload: json });
  };
};