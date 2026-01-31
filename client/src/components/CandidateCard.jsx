import { useState, useEffect } from "react";
import axios from "axios";
import mujibImg from "../assets/mujib1.jpeg";
import { Search } from "lucide-react";

/* ================= MAIN COMPONENT ================= */

export default function CandidateCard() {
  const [searchType, setSearchType] = useState("enrollment");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [emptyError, setEmptyError] = useState("");

  const handleSearch = async () => {
    // ✅ EMPTY INPUT HANDLING
    if (!value.trim()) {
      setCandidates([]);
      setError("");
      setEmptyError(
        searchType === "enrollment"
          ? "Please enter Enrollment Number"
          : "Please enter Name"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEmptyError("");
      setCandidates([]);

      const url =
        searchType === "enrollment"
          ? "https://mujib-lawss.onrender.com/advocate/search"
          : "https://mujib-lawss.onrender.com/advocate/search-name";

      const params =
        searchType === "enrollment"
          ? { enrollment_no: value }
          : { name: value };

      const res = await axios.get(url, { params });

      if (Array.isArray(res.data.data)) {
        setCandidates(res.data.data);
      } else if (res.data.data) {
        setCandidates([res.data.data]);
      } else {
        setError("No record found");
      }
    } catch {
      setError("No record found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ================= LEFT : BACKGROUND IMAGE ================= */}
      <div
        className="relative w-full lg:w-1/2 min-h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${mujibImg})` }}
      >
        {/* MOBILE CARD */}
        <div className="lg:hidden w-full flex justify-center mt-[185px]">
          <CardContent
            {...{
              searchType,
              setSearchType,
              value,
              setValue,
              handleSearch,
              loading,
              error,
              emptyError,
              candidates,
            }}
          />
        </div>
      </div>

      {/* ================= RIGHT : CARD ================= */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-white items-center justify-center">
        <CardContent
          {...{
            searchType,
            setSearchType,
            value,
            setValue,
            handleSearch,
            loading,
            error,
            emptyError,
            candidates,
          }}
        />
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function CardContent({
  searchType,
  setSearchType,
  value,
  setValue,
  handleSearch,
  loading,
  error,
  emptyError,
  candidates,
}) {
  return (
    <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6">

      {/* TYPING NAME */}
      <TypingText text="M. MUJIBUR RAHMAN" />

      <p className="text-center text-sm text-gray-700 mt-2">
        Contesting in the Tamilnadu & Puducherry
        <br />
        Bar Council Election - 2026
      </p>

      {/* RADIO */}
      <div className="mt-5 space-y-3 text-sm">
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            checked={searchType === "enrollment"}
            onChange={() => setSearchType("enrollment")}
          />
          Search by Enrolment No
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="radio"
            checked={searchType === "name"}
            onChange={() => setSearchType("name")}
          />
          Search by Name
        </label>
      </div>

      {/* SEARCH */}
      <div className="mt-4 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            searchType === "enrollment"
              ? "Enter Enrollment No"
              : "Enter Name"
          }
          className="flex-1 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={!value.trim()}
          className="bg-blue-700 text-white px-4 py-2 rounded-xl
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search size={18} />
        </button>
      </div>

      {/* EMPTY INPUT MESSAGE CARD */}
      {emptyError && (
        <div className="mt-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl p-3 text-sm">
          {emptyError}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-center text-sm mt-3 text-gray-500">
          Searching...
        </p>
      )}

      {/* API ERROR */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-300 text-red-700 rounded-xl p-3 text-sm">
          {error}
        </div>
      )}

      {/* RESULTS */}
      {candidates.length > 0 && (
        <div className="mt-4 max-h-56 overflow-y-auto space-y-3 text-sm">
          {candidates.map((c) => (
            <div
              key={c._id}
              className="bg-gray-50 border rounded-xl p-3"
            >
              <p><b>Name:</b> {c.name}</p>
              <p><b>Father:</b> {c.father_name}</p>
              <p><b>Enrollment:</b> {c.enrollment_no}</p>
              <p><b>Bar:</b> {c.bar_association}</p>
              <p><b>District:</b> {c.district}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= TYPING EFFECT ================= */

function TypingText({ text, speed = 200, pause = 1200 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!deleting && index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        setIndex(index + 1);
      } else if (!deleting && index === text.length) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && index > 0) {
        setDisplayed(text.slice(0, index - 1));
        setIndex(index - 1);
      } else {
        setDeleting(false);
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [index, deleting, text, speed, pause]);

  return (
    <h2 className="text-center text-blue-700 font-bold text-xl lg:text-2xl">
      {displayed}
      <span className="ml-1 animate-pulse">|</span>
    </h2>
  );
}
