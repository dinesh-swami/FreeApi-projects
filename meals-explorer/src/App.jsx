import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import useMeals from './hooks/useMeals';
import MealCard from './components/MealCard';
import SearchBar from './components/SearchBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import Loader from './components/Loader';
import Toast from './components/Toast';
import MealModal from './components/MealModal';

function App() {
  const { allMeals, loading, error, refetch } = useMeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(allMeals.map(meal => meal.strCategory).filter(Boolean));
    return Array.from(cats).sort();
  }, [allMeals]);

  // Filter meals
  const filteredMeals = useMemo(() => {
    let result = allMeals;
    if (searchTerm.trim()) {
      result = result.filter(meal =>
        meal.strMeal?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeCategory !== 'all') {
      result = result.filter(meal => meal.strCategory === activeCategory);
    }
    return result;
  }, [allMeals, searchTerm, activeCategory]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleCopy = (meal) => {
    navigator.clipboard.writeText(`${meal.strMeal} - ${meal.strCategory || 'Delicious meal'} from Meals Explorer`);
    showToast('📋 Meal name copied!');
  };

  if (error) {
    return (
      <ThemeProvider>
        <div className="app-container">
          <header className="app-header">
            <div className="logo"><span className="logo-emoji">🍽️</span><h1>Meals Explorer</h1></div>
            <ThemeSwitcher />
          </header>
          <main className="app-main">
            <div className="error-container">
              <span style={{ fontSize: '3rem' }}>⚠️</span>
              <p>{error}</p>
              <button className="retry-btn" onClick={refetch}>Retry</button>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="logo">
            <span className="logo-emoji">🍽️</span>
            <h1>Meals Explorer</h1>
          </div>
          <ThemeSwitcher />
        </header>

        <main className="app-main">
          <SearchBar
            onSearch={setSearchTerm}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {loading ? (
            <Loader />
          ) : filteredMeals.length === 0 ? (
            <div className="empty-container">
              <span style={{ fontSize: '3rem' }}>🍲</span>
              <p>No meals found. Try another search.</p>
            </div>
          ) : (
            <div className="meals-grid">
              {filteredMeals.map(meal => (
                <MealCard key={meal.idMeal} meal={meal} onClick={(m) => setSelectedMeal(m)} />
              ))}
            </div>
          )}
        </main>

        {selectedMeal && <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />}
        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      </div>
    </ThemeProvider>
  );
}

export default App;