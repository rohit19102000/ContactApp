import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 characters long and include letters, numbers, and special characters.");
      return;
    }
  
    const success = await signup(formData.name, formData.email, formData.password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        </form>
        <p className="text-center mt-2">
          Already have an account? 
          <span 
            className="text-primary cursor-pointer underline"
            onClick={() => navigate("/login")}
          > Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
