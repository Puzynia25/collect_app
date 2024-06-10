import { useContext, useEffect, useState } from "react";
import { Context } from "../utils/context";
import { USER_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { deleteUser, fetchAllUsers, updateStatusOrRole } from "../http/userAPI";
import { useNavigate } from "react-router-dom";
import Pages from "../components/Pages";
import { SortIcon } from "../assets/svg/SortIcon";
import { Trash } from "../assets/svg/Trash";
import { ClipboardIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const Admin = observer(() => {
    const { user, page } = useContext(Context);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllUsers(page.page, page.limit)
            .then((data) => (user.setUsers(data.rows), page.setTotalCount(data.count)))
            .catch((e) => console.log(e));
    }, [page.page]);

    useEffect(() => {
        if (user.users.length !== 0) {
            setSelectedAll(selectedIds.length === user.users.length);
        }
    }, [selectedIds]);

    const onSelectedAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectedAll(isChecked);

        if (isChecked) {
            setSelectedIds(user.users.map((item) => item.id));
        } else {
            setSelectedIds([]);
        }
    };

    const onCheckboxChange = (e, id) => {
        const isChecked = e.target.checked;

        setSelectedIds((prevSelectedItems) => {
            if (isChecked) {
                return [...prevSelectedItems, id];
            } else {
                return prevSelectedItems.filter((itemId) => itemId !== id);
            }
        });
    };

    const onRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);

        selectedIds.map((id) => updateStatusOrRole(id, null, newRole).catch((e) => console.log(e)));

        const updateUsers = user.users.map((user) => {
            if (selectedIds.includes(user.id)) {
                return { ...user, role: newRole };
            }
            return user;
        });

        user.setUsers(updateUsers);
        setSelectedIds([]);
        setRole("");
    };

    const onStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        selectedIds.map((id) => updateStatusOrRole(id, newStatus, null).catch((e) => console.log(e)));

        const updateUsers = user.users.map((user) => {
            if (selectedIds.includes(user.id)) {
                return { ...user, status: newStatus };
            }
            return user;
        });

        user.setUsers(updateUsers);
        setSelectedIds([]);
        setStatus("");
    };

    const onDelete = (id) => {
        deleteUser(id)
            .then(() => user.setUsers(user.users.filter((user) => user.id !== id)), setSelectedIds([]))
            .catch((e) => console.log(e));
    };

    const formattedDate = (currentDate) => {
        const date = new Date(currentDate);

        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

        return formattedDate.replace(",", "").replace(",", "");
    };

    return (
        <div className="w-full mt-9 bg-white dark:bg-gray-900 dark:text-white">
            <main className="w-full min-h-screen">
                <div className="p-4 md:p-7 rounded-3xl shadow-lg mx-4 md:mx-0 border border-gray-200 dark:border-gray-600 md:w-full ">
                    <div className="ms-2">
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">Users</h2>
                    </div>
                    {/* Dropdowns */}
                    <div className="ms-4 mt-7 flex gap-3">
                        <div>
                            <select
                                id="status"
                                className="cursor-pointer items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                value={status}
                                onChange={onStatusChange}>
                                <option defaultValue="active">Status</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                        <div>
                            <select
                                id="role"
                                className="cursor-pointer items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                value={role}
                                onChange={onRoleChange}>
                                <option defaultValue="USER">Role</option>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="m-4 relative overflow-x-auto shadow-md sm:rounded-lg text-nowrap">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4 ">
                                        <div className="flex items-center ">
                                            <input
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                checked={selectedAll}
                                                onChange={onSelectedAllChange}
                                            />
                                            <label htmlFor="checkbox-all-search" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Name
                                            <a href="#">
                                                <SortIcon />
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Email
                                            <a href="#">
                                                <SortIcon />
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            sign up at
                                            <a href="#">
                                                <SortIcon />
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            log in at
                                            <a href="#">
                                                <SortIcon />
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            status
                                            <a href="#">
                                                <SortIcon />
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            role
                                            <a href="#">
                                                <SortIcon />
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.users.map((user) => {
                                    return (
                                        <tr
                                            key={user.id}
                                            className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id={`checkbox-table-search-${user.id}`}
                                                        type="checkbox"
                                                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        checked={selectedIds.includes(user.id)}
                                                        onChange={(e) => onCheckboxChange(e, user.id)}
                                                    />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                        checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    onClick={() => navigate(USER_ROUTE + "/" + user.id)}>
                                                    {user.name}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{formattedDate(user.createdAt)}</td>
                                            <td className="px-6 py-4">{formattedDate(user.lastLogin)}</td>
                                            <td className="px-6 py-4">
                                                {user.status === "active" ? (
                                                    <span className="flex text-sm font-medium text-gray-900 dark:text-white me-3">
                                                        <span className="flex place-self-center w-2.5 h-2.5 bg-green-600 rounded-full me-1.5 flex-shrink-0"></span>
                                                        {user.status}
                                                    </span>
                                                ) : (
                                                    <span className="flex text-sm font-medium text-gray-900 dark:text-white me-3">
                                                        <span className="flex place-self-center w-2.5 h-2.5 bg-red-600 rounded-full me-1.5 flex-shrink-0"></span>
                                                        {user.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p>
                                                    {user.role === "USER" ? (
                                                        <span className="text-xs font-medium lowercase bg-gray-100 text-gray-800  inline-flex place-items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                                                            <PencilSquareIcon className="w-2.5 h-2.5 me-1.5" />
                                                            {user.role}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-medium lowercase bg-blue-100 text-blue-800 inline-flex place-items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                                                            <ClipboardIcon className="w-2.5 h-2.5 me-1.5" />
                                                            {user.role}
                                                        </span>
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => onDelete(user.id)}>
                                                    <Trash />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <Pages page={page} />
                </div>
            </main>
        </div>
    );
});

export default Admin;
