import { useActionState } from 'react';

import { useCategory } from '@/context-providers/category-context-provider';
import formDataToJson from '@/helpers/form-data-to-json';

import Loader from './loader';

const VALUE = {
  description: '',
  amount: 0,
  status: 'completed',
  category: '',
  type: 'Cr',
};

export default function Form({ onFormSubmit, initValue }) {
  async function handleSubmit(state, formData) {
    let tr;
    try {
      tr = formDataToJson(formData);
      tr.amount = Number(tr.amount);
      await onFormSubmit(tr);
      return VALUE;
    } catch (error) {
      console.error(error);
      console.log(tr);

      return tr;
    }
  }

  const [value, action, loading] = useActionState(handleSubmit, initValue || VALUE);
  const [category] = useCategory();

  return (
    <div className="form">
      <form
        action={action}
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-2"
        readOnly={true}
      >
        <div className="col">
          <div className="input-group">
            <label htmlFor="type" className="input-group-text">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="form-select"
              defaultValue={value?.type}
              key={value?.type}
            >
              <option value="Cr">Credit</option>
              <option value="Dr">Debit</option>
            </select>
          </div>
        </div>

        <div className="col">
          <div className="input-group">
            <label htmlFor="status" className="input-group-text">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              defaultValue={value?.status}
              key={value?.status}
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="col">
          <div className="input-group">
            <label htmlFor="category" className="input-group-text">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="categoryId"
              defaultValue={value?.categoryId}
              key={value?.categoryId}
              required
            >
              {category.map((c) => (
                <option key={c?._id} value={c?._id}>
                  {c?.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col">
          <div className="input-group">
            <label htmlFor="amount" className="input-group-text">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              defaultValue={value.amount}
              required={true}
            />
          </div>
        </div>

        <div className="col">
          <div className="input-group">
            <label htmlFor="description" className="input-group-text">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              defaultValue={value.description}
              required
            />
          </div>
        </div>

        <div className="col">
          <div className="btn-group">
            <button className="btn btn-danger" type="reset">
              Reset
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <Loader show={loading} />
    </div>
  );
}
