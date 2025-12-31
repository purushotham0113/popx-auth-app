import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* -------------------- TOKEN HELPERS -------------------- */

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    return !!getToken();
};

/* -------------------- AXIOS INSTANCE -------------------- */

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* -------------------- AUTH APIs -------------------- */

// REGISTER
export const registerUser = async (formData) => {
    try {

        const res = await api.post("/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // avatar upload ready
            },
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || { msg: "Registration failed" };
    }
};

// LOGIN
export const loginUser = async (credentials) => {
    try {
        const res = await api.post("/auth/login", credentials);

        // If backend later sends token, this is already handled
        if (res.data.token) {
            setToken(res.data.token);
        }

        return res.data;
    } catch (err) {
        throw err.response?.data || { msg: "Login failed" };
    }
};

// LOGOUT
export const logoutUser = () => {
    removeToken();
};

// GET PROFILE (Protected)
export const fetchProfile = async () => {
    try {
        const res = await api.get("/auth/profile");
        return res.data;
    } catch (err) {
        throw err.response?.data || { msg: "Unauthorized" };
    }
};

// GET PROFILE (Protected)
export const getProfile = async () => {
    try {
        const res = await api.get("/auth/profile");
        return res.data;
    } catch (err) {
        throw err.response?.data || { msg: "Failed to fetch profile" };
    }
};


// UPLOAD AVATAR (Protected)
export const uploadAvatar = async (formData) => {
    try {
        const res = await api.post("/auth/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || { msg: "Avatar upload failed" };
    }
};
