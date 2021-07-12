const initialState = {
  items: [],
  loading: false,
  deleting: false,
  error: null,
  token: null,
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "speakers/create/pending":
      return {
        ...state,
        loading: true,
      };
    case "speakers/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "speakers/create/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "speaker/login/pending":
      return {
        ...state,
        loading: true,
      };
    case "speaker/login/fulfilled":
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case "speaker/login/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const registerSpeaker = (data) => {
  return async (dispatch) => {
    dispatch({ type: "speakers/create/pending" });
    try {
      const response = await fetch(`/speaker`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      dispatch({
        type: "speakers/create/fulfilled",
        payload: json,
      });
    } catch (e) {
      dispatch({ type: "speakers/create/rejected", error: e.toString() });
    }
  };
};

export const authSpeaker = (data) => {
  return async (dispatch) => {
    dispatch({ type: "speaker/login/pending" });
    try {
      const response = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      dispatch({
        type: "speaker/login/fulfilled",
        payload: json,
      });
      localStorage.setItem("token", json.token);
    } catch (e) {
      dispatch({ type: "speaker/login/rejected", error: e.toString() });
    }
  };
};
