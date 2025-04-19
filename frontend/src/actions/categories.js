import axios from "@/helpers/axios";

export async function getAll() {
    const data = await axios('/api/categories');
    if(data.error){
        throw data;
    }
    data.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt));
    return data;
}
export async function add(title) {
    const data = await axios('/api/categories', {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    if (data.error) {
        throw data;
    }
    return data;
}

export async function update(obj) {
    const data = await axios(`/api/categories/${obj._id}`, {
        method: "PUT",
        body: JSON.stringify({ title: obj.title }),
        headers: {
            'Content-Type': "application/json"
        }
    });
    if (data.error) {
        throw data;
    }
    return data;
}

export async function deleteCategory(id) {
    const data = await axios(`/api/categories/${id}`, {
        method: "DELETE",
    });
    if (data.error) {
        throw data;
    }
    return data;
}