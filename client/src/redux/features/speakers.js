

const initialState = {
  items: [],
  loading: false,
  deleting: false,
  error: null,
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
        items: action.payload,
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
        loading: true
      }
    case "speakerByIdFromParams/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload.json
      }
    case "speakerByIdFromParams/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "speakers/edit/pending":
      return {
        ...state,
        editing: true
      };
    case "speakers/edit/fulfilled":
      return {
        ...state,
        items: state.items.map(item => {
          if(item._id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data
            }
          }
          return item
        })
      };
    case "speakers/edit/rejected": {
      return {
        ...state,
        editing: false,
        error: action.error,
      }
    }
    case "avatar/create/pending":
      return {
        ...state,
        loading: true
      }
    case "avatar/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      }
    case "avatar/create/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
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
      const response = await fetch(`http://localhost:4001/login`, {
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
          error: "Необходимо ввести данные",
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
      const response = await fetch(`http://localhost:4001/speaker`, {
        headers: {
          Authorization: `Bearer ${state.speakers.token}`,
        },
      });

      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "speakerById/load/rejected",
          error: "При запросе на сервер произошла ошибка",
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
      const response = await fetch(`http://localhost:4001`);
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "speaker/load/rejected",
          error: "При запросе на сервер произошла ошибка",
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
    dispatch({ type: "speakerByIdFromParams/load/pending"})
    try {
      const response = await fetch(`http://localhost:4001/speaker/${id}`)
      const json = await response.json()
      if (json.error) {
        dispatch({
          type: "speakerByIdFromParams/load/rejected",
          error: "При запросе на сервер произошла ошибка",
        })
      } else {
        dispatch({
          type: "speaker/load/fulfilled",
          payload: json
        });
      }
    } catch (e) {
      dispatch({
        type: "speakerByIdFromParams/load/rejected", error: e.toString()
      })
    }
  }
}


export const patchSpeaker = (data) => {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch({type: "speakers/edit/pending"})
    try {
      await fetch(`http://localhost:4001/speaker`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`
        },
        body: JSON.stringify(data)
      })
      dispatch({
        type: "speakers/edit/fulfilled",
      payload:  data
      })
    } catch (e) {
      dispatch({
        type: "speakers/edit/rejected", error: e.toString()
      })
    }
  }
}


export const uploadAvatar =(file) => {
  return async (dispatch, getState) => {
    const state = getState()
    const formData= new FormData();
    formData.append('file', file)
    try {
     const response = await fetch(`http://localhost:4001/avatar`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`
        },
       body: JSON.stringify(formData)
      })
      const json = await response.json()
      dispatch({type: "avatar/create/fulfilled", payload: json})
    } catch (e) {
      console.log(e.message)
    }
  }
}