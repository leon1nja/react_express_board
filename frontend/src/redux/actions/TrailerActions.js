import axios from "axios";
export const AddTrailerAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}trailer`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_TRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_TRAILER", payload: error.message });
  }
};
export const EditTrailerAction = (state, id, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}trailer?id=${id}`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "EDIT_TRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_TRAILER", payload: error.message });
  }
};

export const AddNewTrailerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_TRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_TRAILER", payload: data });
  }
};

export const GetTrailersAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}trailers`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "GET_TRAILERS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_TRAILERS", payload: error.message });
  }
};

export const DeleteTrailerAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}trailer?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_TRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_TRAILER", payload: { msg: error.message } });
  }
};

export const AddTTrailerAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}ttrailer`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_TTRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_TTRAILER", payload: error.message });
  }
};

export const EditTTrailerAction = (sendData, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}ttrailer/editTruck`,
      { ...sendData },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_TTRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_TTRAILER", payload: error.message });
  }
};

export const AddNewTTrailerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_TTRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_TTRAILER", payload: data });
  }
};


export const GetTTrailersAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}ttrailers`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const tTrailers = data.msg.map((_item, _key) => {
      return {
        id: _key + 1,
        ..._item,
      };
    });
    dispatch({ type: "GET_TTRAILERS", payload: { msg: tTrailers } });
  } catch (error) {
    dispatch({ type: "GET_TTRAILERS", payload: error.message });
  }
};

export const DeleteTTrailerAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}ttrailer?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_TTRAILER", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_TTRAILER", payload: { msg: error.message } });
  }
};
