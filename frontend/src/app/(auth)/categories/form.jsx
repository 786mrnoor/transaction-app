import { useState } from 'react';

import { add, update } from '@/actions/categories';
import Loader from '@/components/loader';
import { useCategoryDispatch } from '@/context-providers/category-context-provider';

export default function Form({ edit, setEdit }) {
  const [title, setValue] = useState('');
  const [isEditable, setIsEditable] = useState(edit);
  const dispatch = useCategoryDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (isEditable !== edit) {
    setIsEditable(edit);
    if (edit) {
      setValue(edit.title);
    }
  }

  function handleReset() {
    setEdit(false);
    setValue('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //if edit then update and return
    if (edit) {
      try {
        setLoading(true);
        setError(null);
        const data = await update({ _id: edit._id, title });
        dispatch({ type: 'UPDATE', data });
        handleReset();
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
      return;
    } else {
      //if new
      try {
        setLoading(true);
        setError(null);
        const data = await add(title);
        dispatch({ type: 'ADD', data });
        handleReset();
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-body-secondary my-border-bottom">
      <Loader show={loading} />
      <div className="input-group">
        <span className="input-group-text">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setValue(e.target.value)}
          className="form-control"
          required
        />
        <button className="btn btn-primary">{edit ? 'Update' : 'Add'}</button>
        {edit && (
          <button className="btn btn-danger" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
      {error && <p className="text-danger m-0">{error.message}</p>}
    </form>
  );
}
