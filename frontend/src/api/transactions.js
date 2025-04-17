import axios from "./axios";

export async function get(trId) {
    const data = await axios(`/api/transactions/${trId}`);
    if (data.error) {
        throw data;
    }
    return data;
};

export async function add(tr) {
    const data = await axios('/api/transactions', {
        method: "POST",
        body: JSON.stringify(tr),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    if (data.error) {
        throw data;
    }
    return data;
};

export async function putTr(tr) {
    const data = await axios(`/api/transactions/${tr._id}`, {
        method: "PUT",
        body: JSON.stringify(tr),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    if (data.error) {
        throw data;
    }
    return data;
};

export async function deleteTr(trId) {
    const data = await axios(`/api/transactions/${trId}`, {
        method: "DELETE",
    });
    if (data.error) {
        throw data;
    }
    return data;
};
