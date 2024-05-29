import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, email, password) => {
    const { data } = await $host.post("api/user/registration", {
        name,
        email,
        password,
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", {
        email,
        password,
    });

    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const fetchAllUsers = async () => {
    const { data } = await $authHost.get("api/user/users");
    return data;
};

export const updateStatusOrRole = async (ids, status, role) => {
    if (status) {
        return await $authHost.patch("api/user/status", { ids, status });
    } else return await $authHost.patch("api/user/status", { ids, role });
};

export const deleteUser = async (id) => {
    return await $authHost.delete("api/user/" + id, { id });
};
