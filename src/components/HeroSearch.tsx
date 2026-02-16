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

  // Auto-suggest effect
  useEffect(() => {
    if (keyword.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const res = await fetch(`/api/jobs/suggest?keyword=${keyword}`);
      const data = await res.json();
      setSuggestions(data);
    };

    fetchSuggestions();
  }, [keyword]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (sector) params.append("sector", sector);
    if (location) params.append("location", location);
    if (jobType) params.append("jobType", jobType);
    if (experience) params.append("experience", experience);

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="search-fields">

      <div className="autocomplete-wrapper">
        <input
          type="text"
          placeholder="Keyword or Job Title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item, index) => (
              <li
                key={index}
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

      <select value={sector} onChange={(e) => setSector(e.target.value)}>
        <option value="">Sector</option>
        <option>Building Materials</option>
        <option>Construction</option>
        <option>Technical Sales</option>
        <option>Education</option>
        <option>Healthcare</option>
      </select>

      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Location</option>
        <option>London</option>
        <option>Manchester</option>
        <option>Birmingham</option>
        <option>Glasgow</option>
        <option>Leeds</option>
        <option>Liverpool</option>
        <option>National</option>
        <option>Remote</option>
      </select>

      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        <option value="">Job Type</option>
        <option>Permanent</option>
        <option>Contract</option>
      </select>

      <select value={experience} onChange={(e) => setExperience(e.target.value)}>
        <option value="">Experience Level</option>
        <option>Mid Level</option>
        <option>Senior</option>
        <option>Executive</option>
      </select>

      <button onClick={handleSearch} className="search-cta">
        Find Your Next Job
      </button>

    </div>
  );
}
