import { useState } from "react";
import { useCategoryDispatch } from "../../ContextProvider/CategoryContextProvider";

export default function Form({ edit, setEdit }) {
    const [title, setValue] = useState('');
    const [isEditable, setIsEditable] = useState(edit);
    const [dispatch, loading, error] = useCategoryDispatch();

    if (isEditable !== edit) {
        setIsEditable(edit);
        if (edit) {
            setValue(edit.title);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //if edit then update and return
        if (edit) {
            const res = await dispatch('UPDATE', {_id: edit._id, title});
            if (res) {
                // console.log(res);
                handleReset();
            }
            return;
        } else {
            //if new 
            const res = await dispatch('ADD', title);
            if (res) {
                handleReset();
            }
        }
    }

    function handleReset() {
        setEdit(false);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-body-secondary my-border-bottom">
            <div className="input-group">
                <span className="input-group-text">Title</span>
                <input type="text" value={title} onChange={e => setValue(e.target.value)} className="form-control" required />
                <button className="btn btn-primary">{edit ? 'Update' : 'Add'}</button>
                {edit &&
                    <button className="btn btn-danger" onClick={handleReset}>Reset</button>
                }
            </div>
            {error && <p className="text-danger m-0">{error.message}</p>}
        </form>
    )
};
