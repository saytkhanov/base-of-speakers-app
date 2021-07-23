const initialState = {
  items: [],
  loading: false,
  deleting: false,
  creating: false,
  error: null,
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "voices/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "voices/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "voices/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "voice/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "voice/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "voice/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "voice/upload/pending":
      return {
        ...state,
        loading: true,
      };
    case "voice/upload/fulfilled":
      return {
        ...state,
        loading: false,
        file: action.payload.file,
      };
    case "voice/create/pending":
      return {
        ...state,
        creating: true,
      };
    case "voice/create/fulfilled":
      return {
        ...state,
        creating: false,
        items: [...state.items, action.payload],
      };
    case "voice/create/rejected":
      return {
        ...state,
        creating: false,
        error: action.error,
      };
    case "voice/delete/pending":
      return {
        ...state,
        deleting: true,
      };
    case "voice/delete/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((voice) => voice._id !== action.payload),
      };
    case "voice/delete/rejected":
      return {
        ...state,
        error: action.error,
        deleting: true,
      };
    default: {
      return state;
    }
  }
}

// export const getVoices = () => {
//   return async (dispatch) => {
//     dispatch({ type: "voices/load/pending" });
//     try {
//       const response = await fetch(`http://localhost:4001/voice`);
//       const json = await response.json();
//       if (json.error) {
//         dispatch({
//           type: "voices/load/rejected",
//           error: "При запросе на сервер произошла ошибка",
//         });
//       } else {
//         dispatch({
//           type: "voices/load/fulfilled",
//           payload: json,
//         });
//       }
//     } catch (e) {
//       dispatch({ type: "voices/load/rejected", error: e.toString() });
//     }
//     }
// }

export const addVoice = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: "voice/create/pending" });
    const state = getState();
    try {
      const response = await fetch(`http://localhost:4001/voice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.speakers.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.title,
          file: state.voices.file,
        }),
      });
      const json = response.json();
      if (json.error) {
        dispatch({
          type: "voice/create/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "voice/create/fulfilled", payload: json });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const uploadVoice = (e) => {
  return async (dispatch, getState) => {
    dispatch({ type: "voice/upload/pending" });
    const state = getState();
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await fetch(`http://localhost:4001/voice/upload`, {
        method: "POST",
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`,
        },
        body: formData,
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "voice/upload/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "voice/upload/fulfilled", payload: json });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteVoice = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: "voice/delete/pending" });
    const state = getState();
    try {
      await fetch(`http://localhost:4001/voice/${id}`, {
        method: "DELETE",
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`,
        },
      });
      dispatch({ type: "voice/delete/fulfilled", payload: id });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getVoiceById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "voices/load/pending" });
    try {
      const response = await fetch(`http://localhost:4001/voices/${id}`);
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "voices/load/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "voices/load/fulfilled", payload: json });
      }
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getVoiceByIdForAuth = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "voice/load/pending" });
    const state = getState();
    try {
      const response = await fetch(`http://localhost:4001/voice`, {
        headers: {
          Authorization: `Bearer ${state.speakers.token}`,
        },
      });
      const json = await response.json();
      dispatch({ type: "voice/load/fulfilled", payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
};
