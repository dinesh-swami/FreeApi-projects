import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import { useFetchVideos } from './hooks/useFetchVideos';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(true);
  const { videos, loading, error, fetchVideos } = useFetchVideos();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        toggleTheme={toggleTheme} 
        isDark={isDark} 
      />
      <Sidebar />

      <div className="main-content">
        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

        <div className="video-grid">
          {filteredVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

        {loading && <div className="loader" style={{textAlign:'center', padding:'40px'}}>Loading...</div>}

        {!loading && filteredVideos.length === 0 && (
          <p style={{textAlign:'center', padding:'40px'}}>No videos found.</p>
        )}

        <div style={{textAlign:'center', margin:'40px 0'}}>
          <button 
            onClick={() => fetchVideos(Math.floor(videos.length / 12) + 1)}
            disabled={loading}
            style={{
              padding: '12px 32px',
              background: '#ff0000',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default App;