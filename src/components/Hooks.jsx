import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../ThemeContext";
import "../index.css";
import { increment, decrement } from "../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePostsMutation, useGetCommentsQuery } from "../app/services/postApi";

const Hooks = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data, error, isLoading, refetch } = useGetCommentsQuery();
  const [createPost, { isLoading: isCreating, error: createError }] = useCreatePostsMutation();

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme]);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(formData).unwrap();
      console.log("Post Created Successfully!", formData);
      setFormData({ name: "", email: "" }); 
      refetch();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  if (isLoading) return <p>LOADING....</p>;
  if (error) return <p>There was an error.</p>;

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-800 m-5">Count: {count}</h2>
      <button
        onClick={toggleTheme}
        style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#333" : "#fff" }}
      >
        Toggle Theme
      </button>

      <div className="flex gap-4 p-2">
        <button className="bg-green-500 rounded-xl p-2" onClick={handleIncrement}>
          Increment
        </button>
        <button className="bg-red-500 rounded-xl p-2" onClick={handleDecrement}>
          Decrement
        </button>
      </div>

      {/* Simple Form */}
      <form onSubmit={handleSubmit} className="mt-5 p-4 bg-gray-100 rounded-lg w-1/3">
        <h3 className="text-xl font-bold mb-3">Simple Form</h3>
        <div className="mb-2">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          {isCreating ? "Submitting..." : "Submit"}
        </button>
        {createError && <p className="text-red-500 mt-2">Error submitting form.</p>}
      </form>

      <div>
        {data?.map((post) => (
          <p key={post.id}>{post.name}</p>
        ))}
      </div>
    </>
  );
};

export default Hooks;
