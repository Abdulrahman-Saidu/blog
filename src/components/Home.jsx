import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import IMG from "../assets/galaxy.jpg";
import UIUX from "../assets/uiux.jpg";
import LINEAR101 from "../assets/linear101.jpg";
import SE from "../assets/SE.jpg";
import PROFILE1 from "../assets/prof1.jpeg";
import LOGO from "../assets/logowhite.png";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  FileUp,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    "View all",
    "Design",
    "Product",
    "Software Engineering",
    "Customer Success",
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    photo: "",
    title: "",
    content: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://blog-be-v2.onrender.com/blog", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setPosts(data.reverse());
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      image: form.image,
      category: form.category,
      title: form.title,
      content: form.content,
      author: "Amber Laurent",
      date: new Date().toLocaleDateString(),
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    };

    try {
      const response = await fetch("https://blog-be-v2.onrender.com/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const savedPost = await response.json();
      setPosts((prev) => [savedPost, ...prev]);
      setForm({ photo: "", title: "", content: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setImagePreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full px-4 bg-gray-900 z-50">
        <div className="max-w-7xl mx-auto py-3 sm:py-6 flex justify-between items-center">
          {/* Logo an Nav Links */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img
                src={LOGO}
                alt="Design"
                height={20}
                width={20}
                className="rounded-full"
              />
              <span className="text:md sm:text-2xl font-bold text-gray-200">
                Untitled UI
              </span>
            </div>
            <ul className="hidden md:flex space-x-7 text-gray-200 font-semibold">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Company
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <a href="#" className="hover:text-gray-400">
                  Marketplace
                </a>{" "}
                <ChevronDown className="h-5 w-5" />
              </li>
              <li className="flex items-center space-x-1">
                <a href="#" className="hover:text-gray-400">
                  Resources
                </a>{" "}
                <ChevronDown className="h-5 w-5" />
              </li>
            </ul>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="rounded-full border border-gray-600 px-5 py-2 bg-gray-800 text-white hover:bg-gray-900">
              Log in
            </button>
            <button className="rounded-full border border-gray-600 px-5 py-2 bg-gray-600 text-white hover:bg-gray-900">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 px-6 py-4 text-gray-600 font-medium z-40">
            <ul className="space-y-3 pb-6 rounded-b-2xl text-gray-300">
              <li>
                <a href="#" className="block hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="block hover:text-white">
                  Company
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <a href="#" className="hover:text-white">
                  Marketplace
                </a>
                <ChevronDown className="h-5 w-5" />
              </li>
              <li className="flex items-center space-x-1">
                <a href="#" className="hover:text-white">
                  Resources
                </a>
                <ChevronDown className="h-5 w-5" />
              </li>
            </ul>

            <div className="w-full flex flex-col items-center space-y-4 pt-4">
              <button className="w-full max-w-xs rounded-full border border-gray-600 px-4 py-2 bg-gray-800 text-white hover:bg-gray-900">
                Log in
              </button>
              <button className="w-full max-w-xs rounded-full border border-gray-600 px-4 py-2 bg-gray-600 text-white hover:bg-gray-900">
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-[120px] px-4 sm:px-30">
        <div className="hidden sm:block">
          <h2 className="text-5xl sm:text-6xl font-semibold text-gray-200 mt-10">
            The Untitled UI Design Journal
          </h2>
          <p className="text-xl font-semibold text-gray-400 mt-10">
            The Untitled UI design Journal features carefully selected good
            works from studios and designers
            <br /> from around the globe. Subscribe for new posts in your inbox
            every Thursday for free.
          </p>
        </div>
        <div className="block sm:hidden">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-200 mt-10 leading-tight">
            The Untitled UI Design Journal
          </h2>
          <p className="text-md font-semibold text-gray-400 mt-5">
            The Untitled UI design Journal features carefully selected good
            works from studios and designers from around the globe.
          </p>
        </div>

        <div className="pt-16 pb-4 relative">
          <img src={IMG} alt="Design" className="w-full rounded-2xl" />
          <div className="hidden sm:block w-full absolute bottom-4 text-gray-200 bg-gradient-to-t from-black/60 to-black/5 px-8 py-10 space-y-3">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold leading-tight">
                Improve your design skills: Develope an "eye" for design
              </h2>
              <a href="">
                <ArrowUpRight className="hover:text-gray-300" />
              </a>
            </div>

            <p>
              Tools and trends change, but good design is timeless. Learn how to
              quickly develope an "eye" for design.
            </p>
            <div className="flex items-center justify-between font-semibold pt-5">
              <div className="flex space-x-8">
                <div className="space-y-3">
                  <p>Written by</p>
                  <div className="flex items-center justify-center space-x-3">
                    <img
                      src={PROFILE1}
                      alt="Design"
                      height={45}
                      width={45}
                      className="rounded-full"
                    />{" "}
                    <span>Amber Laurent</span>
                  </div>
                </div>
                <div className="space-y-5">
                  <p className="font-thin">Published on</p>
                  <h3>10 April 2024</h3>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-sm">File under</p>
                <div className="space-x-3">
                  <a
                    className="rounded-full border-2 border-gray-300 px-5 py-1 hover:border-gray-600"
                    href=""
                  >
                    Design
                  </a>
                  <a
                    className="rounded-full border-2 border-gray-300 px-5 py-1 hover:border-gray-600"
                    href=""
                  >
                    Research
                  </a>
                  <a
                    className="rounded-full border-2 border-gray-300 px-5 py-1 hover:border-gray-600"
                    href=""
                  >
                    Presentstion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block sm:hidden">
          <span className="text-gray-400">Design</span>
          <div>
            <h2 className="text-lg font-semibold leading tight mt-3 mb-3">
              Improve your design skills:
              <br />
              Develope an "eye" for design
            </h2>
            <p className="text-gray-400 text-sm">
              Tools and trends change, but good design is timeless. Learn how to
              quickly develope an "eye" for design.
            </p>
            <div className="w-full flex space-x-4 mt-8">
              <img
                src={PROFILE1}
                alt="Design"
                height={50}
                width={50}
                className="rounded-full"
              />
              <div>
                <span className="font-semibold">Amber Laurent</span>
                <h3 className="text-gray-400">20 January 2024</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-full mx-auto mt-13">
          {/* Tabs Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <div className="flex flex-wrap gap-3 sm:gap-6 mb-6">
              {/* Tab Buttons */}
              {tabs.map((label, index) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(index)}
                  className={`px-0 pb-3 font-semibold transition border-b-2 ${
                    activeTab === index
                      ? "border-white text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 font-semibold mb-6 w-full sm:w-[600px] gap-8 sm:gap-">
              {/* Dropdown Button with Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full sm:w-[300px] flex items-center justify-between gap-2 px-4 py-2 border border-gray-700 text-gray-400 rounded-md hover:text-gray-200 hover:bg-gray-700"
                >
                  Most recent
                  {isDropdownOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute mt-2 w-[300px] bg-gray-900 rounded shadow-lg z-10 text-sm text-gray-400">
                    <ul className="py-4 space-y-4">
                      <li className="px-4 hover:text-gray-200 cursor-pointer">
                        Most recent
                      </li>
                      <li className="px-4 hover:text-gray-200 cursor-pointer">
                        Most popular
                      </li>
                      <li className="px-4 hover:text-gray-200 cursor-pointer">
                        Oldest first
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Create Post Button */}
              <div className="w-full sm:w-full flex justify-center sm:justify-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-2 border border-gray-700 text-gray-400 rounded-md hover:bg-gray-700 hover:text-gray-200 transition"
                >
                  Create Post
                </button>
              </div>

              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                  <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md relative shadow-2xl">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                      <X size={24} />
                    </button>

                    <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                      Create a Post
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div
                        {...getRootProps()}
                        className={`relative border-2 border-dashed h-64 overflow-hidden  rounded-md flex items-center justify-center ${
                          isDragActive
                            ? "border-purple-500"
                            : "border-green-500"
                        }`}
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        )}
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            className="h-64 w-full absolute top-0 bottom-0 right-0 left-0 overflow-hidden object-cover object-center"
                          />
                        )}
                      </div>
                      <div>
                       
                      </div>

                      <div>
                        <input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          placeholder="Title"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-200 focus:border-gray-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <textarea
                          name="content"
                          value={form.content}
                          onChange={handleChange}
                          placeholder="Content"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-200 focus:border-gray-500 focus:outline-none"
                          rows="4"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 border border-gray-600 text-gray-200 rounded-md hover:bg-gray-700 hover:text-gray-100 transition"
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-[52%] border-t-2 border-gray-800 mt-[-25px] hidden sm:block" />

          {/* View Posts */}
          <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12 mt-20">
            {posts.map((post, index) => (
              <div key={index} className="space-y-4 bg-gray-900 rounded-xl">
                <div>
                  <img
                    src={post.photo}
                    alt="Post"
                    className="rounded-2xl w-full"
                  />
                </div>

                <span className="text-sm text-gray-300 font-semibold">
                  {post.category}
                </span>

                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <a href="#">
                    <ArrowUpRight className="hover:text-gray-300" />
                  </a>
                </div>
                <p className="text-sm text-gray-400 font-semibold">
                  {post.content}
                </p>

                <div className="w-full flex space-x-4">
                  <img
                    src={PROFILE1}
                    alt="Amber Laurent"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                  <div>
                    <span className="font-semibold">Amber Laurent</span>
                    <h3 className="text-gray-400">20 January 2024</h3>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="space-y-4 bg-gray-900 rounded-xl">
              <div>
                <img src={UIUX} alt="Design" className="rounded-2xl w-full" />
              </div>
              <span className="text-sm text-gray-300 font-semibold">
                Design
              </span>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">UX review presentations</h2>
                <a href="">
                  <ArrowUpRight className="hover:text-gray-300" />
                </a>
              </div>
              <p className="text-sm text-gray-400 font-semibold">
                How do you create compelling presentations that wow your
                colleagues and impress your managers?
              </p>
              <div className="w-full flex space-x-4">
                <img
                  src={PROFILE1}
                  alt="Amber Laurent"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
                <div>
                  <span className="font-semibold">Amber Laurent</span>
                  <h3 className="text-gray-400">20 January 2024</h3>
                </div>
              </div>
            </div> */}

            {/* <div className="space-y-4 bg-gray-900 rounded-xl">
              <div>
                <img
                  src={LINEAR101}
                  alt="Design"
                  className="rounded-2xl w-full"
                />
              </div>
              <span className="text-sm text-gray-300 font-semibold">
                Product
              </span>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Migrating to linear 101</h2>
                <a href="">
                  <ArrowUpRight className="hover:text-gray-300" />
                </a>
              </div>
              <p className="text-sm text-gray-400 font-semibold">
                Linear helps to streamline software projects, sprints, tasks,
                and bug tracking. Here is how to get started.{" "}
              </p>
              <div className="w-full flex space-x-4">
                <img
                  src={PROFILE1}
                  alt="Amber Laurent"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
                <div>
                  <span className="font-semibold">Amber Laurent</span>
                  <h3 className="text-gray-400">20 January 2024</h3>
                </div>
              </div>
            </div> */}

            {/* <div className="space-y-4 bg-gray-900 rounded-xl">
              <div>
                <img src={SE} alt="Design" className="rounded-2xl w-full" />
              </div>
              <span className="text-sm text-gray-300 font-semibold">
                Software Engineering
              </span>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Building your API stack</h2>
                <a href="">
                  <ArrowUpRight className="hover:text-gray-300" />
                </a>
              </div>
              <p className="text-sm text-gray-400 font-semibold">
                The rise of RESTful APIs has been met by a rise in tools for
                creating, testing, and mansaging them.{" "}
              </p>
              <div className="w-full flex space-x-4">
                <img
                  src={PROFILE1}
                  alt="Amber Laurent"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
                <div>
                  <span className="font-semibold">Amber Laurent</span>
                  <h3 className="text-gray-400">20 January 2024</h3>
                </div>
              </div>
            </div> */}
          </div>

          <div className="text-white rounded-lg mt-10 sm:mt-15">
            {activeTab === 0 && <ViewAllContent />}
            {activeTab === 1 && <DesignContent />}
            {activeTab === 2 && <ProductContent />}
            {activeTab === 3 && <SoftwareEngineeringContent />}
            {activeTab === 4 && <CustomerSuccessContent />}
          </div>
        </div>
        <div className="min-w-full border-t border-gray-700 mt-20" />

        <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-8 text-sm gap-4 sm:gap-0">
          <button className="hidden sm:flex rounded text-gray-400 hover:text-gray-200 font-semibold items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Previous
          </button>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 overflow-x-auto scrollbar-hide font-bold max-w-full px-1">
            <button className="min-w-[40px] px-4 py-2 rounded-full bg-gray-700 text-white">
              1
            </button>
            <button className="min-w-[40px] px-4 py-2 rounded-full text-gray-400 hover:bg-gray-700">
              2
            </button>
            <button className="min-w-[40px] px-4 py-2 rounded-full text-gray-400 hover:bg-gray-700">
              3
            </button>
            <span className="min-w-[40px] px-4 py-2 rounded-full text-gray-400 cursor-default">
              ...
            </span>
            <button className="min-w-[40px] px-4 py-2 rounded-full text-gray-400 hover:bg-gray-700">
              8
            </button>
            <button className="min-w-[40px] px-4 py-2 rounded-full text-gray-400 hover:bg-gray-700">
              9
            </button>
            <button className="min-w-[40px] px-3 py-2 rounded-full text-gray-400 hover:bg-gray-700">
              10
            </button>
          </div>
          <button className="hidden sm:flex rounded text-gray-400 hover:text-gray-200 font-semibold items-center gap-2">
            Next
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-200 px-6 md:px-30 py-12">
        <div className="bg-gray-800 rounded-2xl py-8 sm:py-14 w-full px-4 md:px-18 my-20 space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <h2 className="font-bold text-xl sm:text-3xl text-white">
              Start your 30-day free trial
            </h2>
            <div className="space-x-0 space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <button className="rounded-full border border-gray-600 px-5 py-2 bg-gray-800 text-white hover:bg-gray-900">
                Learn more
              </button>
              <button className="rounded-full border border-gray-600 px-5 py-2 bg-gray-600 text-white hover:bg-gray-900">
                Get Started
              </button>
            </div>
          </div>
          <p className="text-gray-400 font-semibold text-md sm:text-lg">
            Join over 4,000+ startups already growing with Untitled.
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Join our newsletter</h2>
              <p className="text-sm text-gray-400 font-semibold mt-1">
                We'll send you a nice letter once per week. No spam.
              </p>
            </div>

            <form className="flex w-full max-w-md space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-700 rounded-full text-gray-400 focus:border-gray-600 focus:outline-none"
              />

              <button
                type="submit"
                className="rounded-full border border-gray-500 px-5 py-2 bg-gray-700 text-white hover:bg-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="border-t border-gray-800 my-6" />

          {/* Footer Links */}
          <div className="grid grid-cols-2 items-center sm:grid-cols-3 md:grid-cols-6 gap-6 text-sm py-10">
            <div>
              <h3 className="text-gray-400 mb-2">Product</h3>
              <ul className="space-y-3 font-semibold text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Releases
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 mb-3">Company</h3>
              <ul className="space-y-3 font-semibold text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Media kit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 mb-3">Resources</h3>
              <ul className="space-y-3 font-semibold text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 mb-3">Use cases</h3>
              <ul className="space-y-3 font-semibold text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Startups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Enterprise
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Government
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    SaaS centre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Marketplaces
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ecommerce
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 mb-3">Social</h3>
              <ul className="space-y-3 font-semibold text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    AngelList
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Dribble
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 mb-3">Legal</h3>
              <ul className="space-y-3 font-semibold text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Licenses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 my-6" />
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-center text-sm text-gray-500 space-y-4 md:space-y-0 md:text-left">
            <div className="flex items-center space-x-2">
              <img
                src={LOGO}
                alt="Design"
                height={20}
                width={20}
                className="rounded-full"
              />
              <span className="text-md sm:text-2xl font-bold text-gray-200">
                Untitled UI
              </span>
            </div>

            <div>
              &copy; {new Date().getFullYear()} Untitled UI. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ViewAllContent = () => (
  <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12"></div>
);

const DesignContent = () => <div>Design</div>;
const ProductContent = () => <div>Product</div>;
const SoftwareEngineeringContent = () => <div>Software Engineering</div>;
const CustomerSuccessContent = () => <div>Customer Success</div>;

export default Home;
