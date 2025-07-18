import { useActionState } from 'react';

import Loader from '@/components/loader';
import { useCategory } from '@/context-providers/category-context-provider';
import { useTransactionDispatch } from '@/context-providers/transactions-context-provider';
import axios from '@/helpers/axios';
import formDataToJson from '@/helpers/form-data-to-json';
import valueAsDate from '@/helpers/value-as-date';

let date = new Date();
let VALUE = {
  date: 'updatedAt',
  startDate: valueAsDate(date),
  endDate: valueAsDate(date),
  type: '',
  status: '',
  category: '',
};

export default function Header() {
  const dispatch = useTransactionDispatch();
  async function handleSubmit(state, formData) {
    let data;
    try {
      data = formDataToJson(formData);
      let { date, startDate, endDate, type, status, category } = data;
      let res = await axios(
        `/api/transactions?date=${date}&startDate=${startDate}&endDate=${endDate}&type=${type}&status=${status}&category=${category}`
      );
      if (res.error) {
        throw res;
      }
      res.sort((a, b) => new Date(b.modified) - new Date(a.modified));
      dispatch({ type: 'INIT', data: res });
      return data;
    } catch (error) {
      console.error(error);
      return data;
    }
  }

  const [filter, action, loading] = useActionState(handleSubmit, VALUE);

  const [category] = useCategory();
  return (
    <form className="row row-cols-auto gx-3 gy-2" action={action}>
      <div className="col">
        <div className="input-group input-group-sm">
          <div className="input-group-text">
            <input
              type="radio"
              className="form-check-input"
              name="date"
              defaultChecked={VALUE.date}
              value="createdAt"
            />
            <span className="ms-1">Created</span>
          </div>
          <div className="input-group-text">
            <input
              type="radio"
              className="form-check-input"
              name="date"
              defaultChecked={VALUE.date}
              value="updatedAt"
            />
            <span className="ms-1">Updated</span>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="input-group input-group-sm">
          <input
            type="date"
            defaultValue={filter?.startDate}
            className="form-control"
            name="startDate"
          />

          <span className="input-group-text">Between Date</span>
          <input
            type="date"
            defaultValue={filter?.endDate}
            className="form-control"
            name="endDate"
          />
        </div>
      </div>
      <div className="col">
        <div className="input-group input-group-sm">
          <span className="input-group-text">Type</span>
          <select
            defaultValue={filter?.type}
            key={filter?.type}
            className="form-select"
            name="type"
          >
            <option value="">All</option>
            <option value="Cr">Credit</option>
            <option value="Dr">Debit</option>
          </select>
        </div>
      </div>

      <div className="col">
        <div className="input-group input-group-sm">
          <span className="input-group-text">Status</span>
          <select
            defaultValue={filter?.status}
            key={filter?.status}
            className="form-select"
            name="status"
          >
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="col">
        <div className="input-group input-group-sm">
          <span className="input-group-text">Category</span>
          <select
            defaultValue={filter?.category}
            key={filter?.category}
            className="form-select"
            name="category"
          >
            <option value="">All</option>
            {category.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col">
        <div className="btn-group">
          <button className="btn btn-sm btn-success" type="submit">
            Submit
          </button>
          <button className="btn btn-sm btn-danger" type="reset">
            Reset
          </button>
        </div>
      </div>
      <Loader show={loading} />
    </form>
  );
}
