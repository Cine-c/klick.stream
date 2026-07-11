import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdvancedSearchPanel() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [personQuery, setPersonQuery] = useState('');
  const [personResults, setPersonResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [rating, setRating] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (personQuery.length < 2) {
      setPersonResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/people?query=${encodeURIComponent(personQuery)}`);
        const data = await res.json();
        setPersonResults(data.results || []);
      } catch {
        setPersonResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [personQuery]);

  const handleApply = () => {
    const params = new URLSearchParams();
    if (selectedPerson) params.append('person', selectedPerson.id);
    if (yearFrom) params.append('yearFrom', yearFrom);
    if (yearTo) params.append('yearTo', yearTo);
    if (rating) params.append('rating', rating);

    router.push(`/discover?${params.toString()}`);
    setIsOpen(false);
  };

  const handleReset = () => {
    setPersonQuery('');
    setSelectedPerson(null);
    setYearFrom('');
    setYearTo('');
    setRating('');
  };

  return (
    <>
      <button
        className="btn-advanced-search"
        onClick={() => setIsOpen(!isOpen)}
        title="Advanced search filters"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="advanced-search-panel">
          <div className="panel-content">
            <h3>Advanced Search</h3>

            {/* Actor/Director search */}
            <div className="filter-group">
              <label>Actor or Director</label>
              <div className="person-search">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name..."
                  value={personQuery}
                  onChange={(e) => setPersonQuery(e.target.value)}
                  className="person-input"
                />
                {personResults.length > 0 && (
                  <div className="person-results">
                    {personResults.map((person) => (
                      <button
                        key={person.id}
                        className={`person-item ${selectedPerson?.id === person.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedPerson(person);
                          setPersonQuery(person.name);
                          setPersonResults([]);
                        }}
                      >
                        {person.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
                            alt={person.name}
                            className="person-thumbnail"
                          />
                        )}
                        <span>{person.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedPerson && (
                <button
                  className="tag-remove"
                  onClick={() => {
                    setSelectedPerson(null);
                    setPersonQuery('');
                  }}
                >
                  ✕ {selectedPerson.name}
                </button>
              )}
            </div>

            {/* Year range */}
            <div className="filter-group filter-inline">
              <label>Release Year</label>
              <div className="range-inputs">
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  placeholder="From"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="range-input"
                />
                <span className="range-sep">–</span>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  placeholder="To"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  className="range-input"
                />
              </div>
            </div>

            {/* Rating filter */}
            <div className="filter-group">
              <label>Minimum Rating</label>
              <div className="rating-selector">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="rating-slider"
                />
                <span className="rating-display">{rating ? `${rating}★` : 'Any'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={handleApply}>
                Apply Filters
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
              <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
