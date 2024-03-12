import React from "react";
import { useReducer } from "react";

export const initialState = {
  name: "",
  batch: "",
  course: "",
  image: "",
  rating: 0,
  status: "inactive",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.entry };
    case "BATCH":
      return { ...state, batch: action.entry };
    case "COURSE":
      return { ...state, course: action.entry };
    case "IMAGE":
      return { ...state, image: action.entry };
    case "RATING":
      return { ...state, rating: action.entry };
    case "STATUS":
      return { ...state, status: action.entry };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const AddStudent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { name, batch, course, image, rating, status } = state;

  const handleRatingChange = (e) => {
    dispatch({ type: "RATING", entry: parseInt(e.target.value) });
  };

  const handleStatusChange = (e) => {
    dispatch({
      type: "STATUS",
      entry: e.target.checked ? "active" : "inactive",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <h1>Add Student</h1>
      <div>
        <form data-testid="input-form" onSubmit={handleSubmit}>
          <div className="name-wrapper" data-testid="name-wrapper">
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) =>
                dispatch({ type: "NAME", entry: e.target.value })
              }
            />
          </div>

          <div className="batch-wrapper" data-testid="batch-wrapper">
            <label>Batch :</label>
            <input
              type="text"
              name="batch"
              value={batch}
              onChange={(e) =>
                dispatch({ type: "BATCH", entry: e.target.value })
              }
            />
          </div>

          <div className="course-wrapper" data-testid="course-wrapper">
            <label>Course :</label>
            <input
              type="text"
              name="course"
              value={course}
              onChange={(e) =>
                dispatch({ type: "COURSE", entry: e.target.value })
              }
            />
          </div>

          <div className="image-wrapper" data-testid="image-wrapper">
            <label>Image Link :</label>
            <input
              type="text"
              name="image"
              placeholder="Enter image link"
              value={image}
              onChange={(e) =>
                dispatch({ type: "IMAGE", entry: e.target.value })
              }
            />
          </div>

          <div className="rating-wrapper" data-testid="rating-wrapper">
            <label>Rating :</label>
            <select
              value={rating}
              onChange={handleRatingChange}
              data-testid="rating-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div
            className="current-status-wrapper"
            data-testid="current-status-wrapper"
          >
            <label>Current Status :</label>
            <div>
              <input
                type="checkbox"
                onChange={handleStatusChange}
                checked={status === "active"}
              />
              <label>Active</label>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
