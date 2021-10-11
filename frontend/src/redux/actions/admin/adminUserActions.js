import axios from "axios";

const adminUsersActions = {
    getUsers: () => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.get("http://localhost:4000/api/admin/users", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if (response.data.success) {
                dispatch({ type: "GET_USERS", payload: response.data.response });
                return response.data;
            }
        };
    },
    createUser: (user) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.post(
                "http://localhost:4000/api/admin/users",
                user,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.data.success) {
                await dispatch({ type: "ADD_USER", payload: response.data.response });
                return response.data;
            }
        };
    },
    updateUser: (newUser, userId) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.put(
                "http://localhost:4000/api/admin/user/" + userId,
                newUser,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.data.success) {
                await dispatch({ type: "UPDATE_USER", payload: newUser });
                return response.data;
            }
        };
    },

    deleteUser: (userId) => {
        let token = localStorage.getItem("token");
        return async (dispatch) => {
            let response = await axios.delete(
                "http://localhost:4000/api/admin/user/" + userId,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(response)
            if (response.data.success) {
                await dispatch({ type: "DELETE_USER", payload: userId });
                return response.data;
            }
        };
    },
    countVisit: () => {
        return async (dispatch) => {
            await axios.post('http://localhost:4000/api/admin/general')
        }
    },
    getUser: (id) => {
        return async (dispatch) => {
            dispatch({ type: "GET_USER", payload: id })
        }
    }
    // getReviews: () => {
    //     return async (dispatch) => {
    //         let response = await axios.get(
    //             "http://localhost:4000/api/review"
    //         );
    //         if (response.data.success) {
    //             dispatch({ type: "GET_REVIEWS", payload: response.data.response });
    //             return response.data;
    //         }
    //     };
    // },
};
export default adminUsersActions;
