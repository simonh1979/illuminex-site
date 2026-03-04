"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HeroSearch() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const [sectors, setSectors] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  /*
  ===============================
  Load filter dropdown values
  (using API facets)
  ===============================
  */
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();

        setSectors(data.facets?.sectors || []);
        setLocations(data.facets?.locations || []);
      } catch (err) {
        console.error("Failed loading filters", err);
      }
    };

    fetchFilters();
  }, []);

  /*
  ===============================
  Suggestions fetch
  ===============================
  */
  useEffect(() => {
    if (keyword.length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/jobs/suggest?keyword=${keyword}`);
        const data = await res.json();
        setSuggestions(data || []);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [keyword]);

  /*
  ===============================
  Run search
  ===============================
  */
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (sector) params.append("sector", sector);
    if (location) params.append("location", location);
    if (jobType) params.append("jobType", jobType);
    if (experience) params.append("experience", experience);

    router.push(`/live-jobs?${params.toString()}`);
  };

  /*
  ===============================
  Keyboard navigation
  ===============================
  */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      setKeyword(suggestions[activeIndex]);
      setSuggestions([]);
    }
  };

  return (
    <form
      className="search-fields"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      {/* Keyword input */}
      <div className="autocomplete-wrapper">
        <input
          type="text"
          placeholder="Keyword or Job Title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => {
                  setKeyword(item);
                  setSuggestions([]);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sector */}
      <select value={sector} onChange={(e) => setSector(e.target.value)}>
        <option value="">Sector</option>
        {sectors.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {/* Location */}
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Location</option>
        {locations.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>

      {/* Job Type (still manual until JobAdder provides data) */}
      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        <option value="">Job Type</option>
        <option>Permanent</option>
        <option>Contract</option>
      </select>

      {/* Experience (still manual) */}
      <select value={experience} onChange={(e) => setExperience(e.target.value)}>
        <option value="">Experience Level</option>
        <option>Mid Level</option>
        <option>Senior</option>
        <option>Executive</option>
      </select>

      {/* Submit */}
      <button type="submit" className="search-cta">
        Find Your Next Job
      </button>
    </form>
  );
}