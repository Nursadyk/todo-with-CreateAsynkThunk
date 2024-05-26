import React from "react";
import { useUpDispatch, useUpSelector } from "../../redux/store";
import {
  completed,
  delRec,
  fetchData,
  postRec,
} from "../../redux/futures/slices/Todo.Slice";
const Header: React.FC = () => {
  const { todo } = useUpSelector((s) => s.TodoSlice);
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useUpDispatch();
  React.useEffect(() => {
    dispatch(fetchData());
  }, []);
  const postUser = () => {
    dispatch(
      postRec({
        title: inputValue,
        completed: false,
      })
    );
    setInputValue("");
  };
  return (
    <header className=" px-4 py-4">
      <div className="header__inner">
        <div className="add-user mb-3">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="add user here"
            className="border py-2"
            value={inputValue}
          />
          <button
            onClick={postUser}
            className="border bg-green-500 text-white py-2 px-5 ml-2"
          >
            addUser
          </button>
        </div>
        {todo.length <= 0 ? <h3>please add user</h3> : null}
        {todo.slice(0, 10).map((el: Person, index) => (
          <div className="todo-card" key={index}>
            <div className="completed flex items-center gap-5 mb-3">
              <button
                onClick={() => dispatch(completed(Number(el._id)))}
                className={`${
                  el.completed
                    ? "border py-1 px-1 bg-orange-400 text-white"
                    : "border py-1 px-1 bg-green-400 text-white"
                }`}
              >
                {el.completed ? (
                  <span className="material-symbols-outlined">close</span>
                ) : (
                  <span className="material-symbols-outlined">check</span>
                )}
              </button>
              <button
                onClick={() =>
                  dispatch(
                    delRec({
                      _id: el._id,
                      title: el.title,
                      completed: el.completed,
                    })
                  )
                }
                className="border py-1 px-1 bg-red-400 text-white"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
              <p
                style={{
                  textDecoration: el.completed ? "line-through" : "none",
                }}
              >
                {el.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
