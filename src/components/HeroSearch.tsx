"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroSearch() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const [sectors, setSectors] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  /*
  ===============================
  Load filter dropdown values
  using API facets
  ===============================
  */
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/jobs");

        if (!response.ok) {
          throw new Error(
            `Filter request failed (${response.status})`
          );
        }

        const data = await response.json();

        setSectors(data.facets?.sectors || []);
        setLocations(data.facets?.locations || []);
      } catch (error) {
        console.error("Failed loading filters", error);
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
    if (keyword.trim().length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/jobs/suggest?keyword=${encodeURIComponent(
            keyword.trim()
          )}`
        );

        if (!response.ok) {
          throw new Error(
            `Suggestion request failed (${response.status})`
          );
        }

        const data = await response.json();

        setSuggestions(Array.isArray(data) ? data : []);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };

    fetchSuggestions();
  }, [keyword]);

  /*
  ===============================
  Run search
  ===============================
  */
  const handleSearch = (
    keywordOverride?: string
  ) => {
    const params = new URLSearchParams();

    const finalKeyword =
      keywordOverride !== undefined
        ? keywordOverride.trim()
        : keyword.trim();

    if (finalKeyword) {
      params.set("keyword", finalKeyword);
    }

    if (sector) {
      params.set("sector", sector);
    }

    if (location) {
      params.set("location", location);
    }

    if (jobType) {
      params.set("jobType", jobType);
    }

    if (experienceLevel) {
      params.set("experienceLevel", experienceLevel);
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `/jobs?${queryString}`
        : "/jobs"
    );
  };

  /*
  ===============================
  Keyword keyboard navigation
  ===============================
  */
  const handleKeywordKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "ArrowDown" &&
      suggestions.length > 0
    ) {
      event.preventDefault();

      setActiveIndex((previousIndex) =>
        previousIndex < suggestions.length - 1
          ? previousIndex + 1
          : 0
      );

      return;
    }

    if (
      event.key === "ArrowUp" &&
      suggestions.length > 0
    ) {
      event.preventDefault();

      setActiveIndex((previousIndex) =>
        previousIndex > 0
          ? previousIndex - 1
          : suggestions.length - 1
      );

      return;
    }

    if (event.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (
        activeIndex >= 0 &&
        activeIndex < suggestions.length
      ) {
        const selectedSuggestion =
          suggestions[activeIndex];

        setKeyword(selectedSuggestion);
        setSuggestions([]);
        setActiveIndex(-1);

        handleSearch(selectedSuggestion);
        return;
      }

      setSuggestions([]);
      setActiveIndex(-1);
      handleSearch();
    }
  };

  /*
  ===============================
  Search from dropdowns with Enter
  ===============================
  */
  const handleSelectKeyDown = (
    event: React.KeyboardEvent<HTMLSelectElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleSearch();
  };

  return (
    <form
      className="search-fields"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      {/* Keyword input */}
      <div className="autocomplete-wrapper">
        <label
          className="hero-search-label"
          htmlFor="hero-search-keyword"
        >
          Keyword or job title
        </label>

        <input
          id="hero-search-keyword"
          name="keyword"
          type="text"
          placeholder="Keyword or Job Title"
          value={keyword}
          onChange={(event) =>
            setKeyword(event.target.value)
          }
          onKeyDown={handleKeywordKeyDown}
          autoComplete="off"
        />

        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className={
                  index === activeIndex ? "active" : ""
                }
                onMouseDown={(event) => {
                  event.preventDefault();

                  setKeyword(item);
                  setSuggestions([]);
                  setActiveIndex(-1);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sector */}
      <label
        className="hero-search-label"
        htmlFor="hero-search-sector"
      >
        Sector
      </label>

      <select
        id="hero-search-sector"
        name="sector"
        value={sector}
        onChange={(event) =>
          setSector(event.target.value)
        }
        onKeyDown={handleSelectKeyDown}
      >
        <option value="">Sector</option>

        {sectors.map((sectorOption) => (
          <option
            key={sectorOption}
            value={sectorOption}
          >
            {sectorOption}
          </option>
        ))}
      </select>

      {/* Location */}
      <label
        className="hero-search-label"
        htmlFor="hero-search-location"
      >
        Location
      </label>

      <select
        id="hero-search-location"
        name="location"
        value={location}
        onChange={(event) =>
          setLocation(event.target.value)
        }
        onKeyDown={handleSelectKeyDown}
      >
        <option value="">Location</option>

        {locations.map((locationOption) => (
          <option
            key={locationOption}
            value={locationOption}
          >
          {locationOption}
        </option>
      ))}
    </select>

      {/* Job Type */}
      <label
        className="hero-search-label"
        htmlFor="hero-search-job-type"
      >
        Job type
      </label>

      <select
        id="hero-search-job-type"
        name="jobType"
        value={jobType}
        onChange={(event) =>
          setJobType(event.target.value)
        }
        onKeyDown={handleSelectKeyDown}
      >
        <option value="">Job Type</option>
        <option value="Permanent">Permanent</option>
        <option value="Contract">Contract</option>
      </select>

      {/* Experience Level */}
        <label
          className="hero-search-label"
          htmlFor="hero-search-experience-level"
        >
          Experience level
        </label>

        <select
          id="hero-search-experience-level"
          name="experienceLevel"
          value={experienceLevel}
          onChange={(event) =>
            setExperienceLevel(event.target.value)
          }
          onKeyDown={handleSelectKeyDown}
        >
          <option value="">Experience Level</option>
          <option value="Mid">Mid Level</option>
          <option value="Senior">Senior</option>
          <option value="Executive">Executive</option>
        </select>

      {/* Submit */}
      <button
        type="submit"
        className="search-cta"
      >
        Find Your Next Job
      </button>
    </form>
  );
}