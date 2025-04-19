import { useState } from "react";
import { useCategory, useCategoryDispatch } from "@/context-providers/category-context-provider"
import { deleteCategory } from '@/actions/categories';
import Loader from "@/components/loader";
import Form from "./form";
import Category from "./category";

export default function Page() {
    const [edit, setEdit] = useState(false);
    const data = useCategory();
    const [loading, setLoading] = useState(false);
    const dispatch = useCategoryDispatch();

    async function handleDelete(_id) {
        if (window.confirm('Are You Sure You Want To Delete This Topic!')) {
            try {
                setLoading(true);
                await deleteCategory(_id);
                dispatch({ type: 'DELETE', _id });
                window.alert('Deleted Successfully');
            } catch (error) {
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        }
    }

    return (
        <div className="my-container">
            <Loader show={loading} />
            <Form edit={edit} setEdit={setEdit} />

            <ul className="sortable-list list-group p-3 mt-4 mb-4">
                {
                    data.map(category => (
                        <Category data={category} edit={edit} key={category._id}>
                            <button className="btn btn-primary btn-sm" type="button" onClick={() => setEdit(category)}>Edit</button>
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(category._id)}>Delete</button>
                        </Category>
                    ))
                }
            </ul>
        </div>
    )
};
