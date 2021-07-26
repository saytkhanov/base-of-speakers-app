const initialState = {
  items: [],
  loading: false,
  deleting: false,
  error: null,
  currentItem: [],
  token: localStorage.getItem("token"),
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
    case "speakerRandom/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "speakerRandom/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "speakerRandom/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "speaker/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "speaker/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "speaker/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "speakerById/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "speakerById/load/fulfilled":
      return {
        ...state,
        loading: false,
        currentItem: action.payload,
      };
    case "speakerById/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "speaker/login/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "token/remove/fulfilled":
      return {
        ...state,
        token: null,
      };
    case "speakerByIdFromParams/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "speakerByIdFromParams/load/fulfilled":
      return {
        ...state,
        loading: false,
        currentItem: action.payload,
      };
    case "speakerByIdFromParams/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "speakers/edit/pending":
      return {
        ...state,
        editing: true,
      };
    case "speakers/edit/fulfilled":
      return {
        ...state,
        currentItem: state.currentItem.map((item) => {
          if (item._id === action.payload) {
            return {
              ...item,
              ...action.payload.data,
            };
          }
          return item;
        }),
      };
    case "speakers/edit/rejected": {
      return {
        ...state,
        editing: false,
        error: action.error,
      };
    }
    case "avatar/create/pending":
      return {
        ...state,
        loading: true,
      };
    case "avatar/create/fulfilled":
      return {
        ...state,
        loading: false,
        currentItem: {
          ...state.currentItem,
          avatar: action.payload,
        },
      };
    case "avatar/create/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "cost/load/pending":
      return {
        ...state,
        loading: true
      }
    case "cost/load/fulfilled":
      return {
        ...state,
        cost: action.payload,
        loading: false
      }
    case "cost/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error
      }
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
      if (json.error) {
        dispatch({
          type: "speakers/create/rejected",
          error: json.error,
        });
      } else {
        dispatch({
          type: "speakers/create/fulfilled",
          payload: json,
        });
      }
    } catch (e) {
      console.log(e.message);
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

      if (json.error) {
        dispatch({
          type: "speakerById/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({
          type: "speaker/login/fulfilled",
          payload: json,
        });
        localStorage.setItem("token", json.token);
      }
    } catch (e) {
      dispatch({ type: "speaker/login/rejected", error: e.toString() });
    }
  };
};

export const speakerById = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "speakerById/load/pending" });
    try {
      const response = await fetch(`/speaker`, {
        headers: {
          Authorization: `Bearer ${state.speakers.token}`,
        },
      });

      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "speakerById/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({
          type: "speakerById/load/fulfilled",
          payload: json,
        });
      }
    } catch (e) {
      dispatch({ type: "speakerById/load/rejected", error: e.toString() });
    }
  };
};

export const getSpeakers = () => {
  return async (dispatch) => {
    dispatch({ type: "speaker/load/pending" });
    try {
      const response = await fetch(`/`);
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "speaker/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({
          type: "speaker/load/fulfilled",
          payload: json,
        });
      }
    } catch (e) {
      dispatch({ type: "speaker/load/rejected", error: e.toString() });
    }
  };
};


export const getRandomSpeakers = () => {
  return async (dispatch) => {
    dispatch({ type: "speakerRandom/load/pending" });
    try {
      const response = await fetch(`/random`);
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "speakerRandom/load/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({
          type: "speakerRandom/load/fulfilled",
          payload: json,
        });
      }
    } catch (e) {
      dispatch({ type: "speakerRandom/load/rejected", error: e.toString() });
    }
  };
};

export const tokenRemove = () => {
  localStorage.removeItem("token");

  return (dispatch) => {
    dispatch({
      type: "token/remove/fulfilled",
    });
  };
};
export const getSpeakerByIdFromParams = (id) => {
  return async (dispatch) => {
    dispatch({ type: "speakerByIdFromParams/load/pending" });
    try {
      const response = await fetch(`/speaker/${id}`);
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "speakerByIdFromParams/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({
          type: "speakerByIdFromParams/load/fulfilled",
          payload: json,
        });
      }
    } catch (e) {
      dispatch({
        type: "speakerByIdFromParams/load/rejected",
        error: e.toString(),
      });
    }
  };
};

export const patchSpeaker = (data) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "speakers/edit/pending" });
    try {
     const response = await fetch(`/speaker`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`,
        },
        body: JSON.stringify(data),
      });
     const json = response.json()
      dispatch({
        type: "speakers/edit/fulfilled",
        payload: json,
      });
    } catch (e) {
      dispatch({
        type: "speakers/edit/rejected",
        error: e.toString(),
      });
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/avatar`, {
        method: "POST",
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`,
        },
        body: formData,
      });
      const json = await response.json();
      dispatch({ type: "avatar/create/fulfilled", payload: json.avatar });
    } catch (e) {
      console.log(e.message);
    }
  };
};


export const loadSpeakerByCost = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/sort')
      const json = await response.json()
      dispatch({
        type: "cost/load/fulfilled", payload: json
      })
    } catch (e) {
      console.log(e.message);
    }
  }
}
