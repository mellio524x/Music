import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import coverArt from './assets/Cover.png'
import track1 from './assets/JavaScript.mp3'
import track2 from './assets/Code Like a Pro.mp3'
import track3 from './assets/reactv2.mp3'
import track4 from './assets/Build That DB.mp3'
import track5 from './assets/Bug Hunt.mp3'
import track6 from './assets/Git it Render it.mp3'
import track7 from './assets/Code and Ctrl+Z.mp3'
import track8 from './assets/local2live.mp3'
import track9 from './assets/Python Got That Flow.mp3'
import track10 from './assets/build it up V.2.mp3'
import track12 from './assets/Hello.mp3'
import track11 from './assets/Dreaming in Code.mp3'

const ALBUM_DATA = {
  title: "Hello, World!",
  artist: "DEV",
  description: "A groundbreaking journey through digital realms. Twelve tracks of pure electronic fury, crafted for those who speak the language of bass drops,Java, C++ and more. From glitchy breakdowns to earth-shattering wobbles, this album merges programming logic with sonic chaos.",
  coverArt: coverArt, 
  tracks: [
    { id: 1, title: "Just JavaScript", duration: "3:28", file: track1 },
    { id: 2, title: "Code like a Pro", duration: "4:15", file: track2 },
    { id: 3, title: "React", duration: "3:28", file: track3 },
    { id: 4, title: "Build that DB", duration: "4:03", file: track4 },
    { id: 5, title: "Bug Hunt", duration: "3:55", file: track5 },
    { id: 6, title: "Git it Render it", duration: "4:22", file: track6 },
    { id: 7, title: "Code and Ctrl+Z", duration: "3:17", file: track7 },
    { id: 8, title: "Local2Live", duration: "4:08", file: track8 },
    { id: 9, title: "Python Got That Flow(E)", duration: "3:33", file: track9 },
    { id: 10, title: "Build it up", duration: "4:25", file: track10 },
    { id: 11, title: "Dreaming in Code", duration: "3:50", file: track11 },
    { id: 12, title: "Hello, World!", duration: "5:12", file: track12 }
  ]
};

function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrack < ALBUM_DATA.tracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  };

  const nextTrack = () => {
    if (currentTrack < ALBUM_DATA.tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 glitch-text">
            {ALBUM_DATA.title}
          </h1>
          <p className="text-2xl text-purple-300 font-light tracking-wider">
            by <span className="text-cyan-400 font-bold">{ALBUM_DATA.artist}</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Album Art & Player */}
          <div className="space-y-6">
            {/* Album Art Placeholder */}
            <div className="relative group">
              <div className={`w-full aspect-square bg-gradient-to-br from-purple-800 to-black rounded-xl border-2 border-purple-500 border-opacity-30 overflow-hidden album-cover ${isPlaying ? 'playing' : ''}`}>
                {!imageError ? (
                  <img
                    src={ALBUM_DATA.coverArt}
                    alt={`${ALBUM_DATA.title} Album Cover`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.987 3.987 0 0013 12a3.987 3.987 0 00-.172-1.415 1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-purple-300 text-lg">Album Art</p>
                      <p className="text-purple-500 text-sm">Placeholder</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity rounded-xl"></div>
              
              {/* Album Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-xl">
                <h2 className="text-2xl font-bold text-white mb-1">{ALBUM_DATA.title}</h2>
                <p className="text-cyan-400 font-medium">by {ALBUM_DATA.artist}</p>
                <p className="text-purple-300 text-sm mt-1">{ALBUM_DATA.tracks.length} tracks</p>
              </div>
            </div>

            {/* Music Player Controls */}
            <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-purple-500 border-opacity-30 rounded-xl p-6">
              <audio
                ref={audioRef}
                src={ALBUM_DATA.tracks[currentTrack]?.file}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
              />

              {/* Current Track Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-1">
                  {ALBUM_DATA.tracks[currentTrack]?.title}
                </h3>
                <p className="text-purple-300 text-sm">
                  Track {currentTrack + 1} of {ALBUM_DATA.tracks.length}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div 
                  className="w-full h-2 bg-purple-900 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-100"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-purple-300 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6 mb-4">
                <button
                  onClick={prevTrack}
                  disabled={currentTrack === 0}
                  className="p-3 rounded-full bg-purple-700 hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>

                <button
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 transition-all transform hover:scale-105"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  disabled={currentTrack === ALBUM_DATA.tracks.length - 1}
                  className="p-3 rounded-full bg-purple-700 hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 volume-slider"
                />
              </div>
            </div>
          </div>

          {/* Tracklist & Album Info */}
          <div className="space-y-6">
            <h1>Meet DEV, </h1>
            
            <p >
 the boundary-breaking artist who’s turning lines of code into electrifying beats. By day, DEV is a dedicated software developer and full stack wizard — by night, he transform his passion for tech into pulse-pounding tracks that capture the real life of a Dev.

Blending the worlds of music, coding, and creative problem-solving, DEV takes the skills used to build apps and websites and flips them into futuristic soundscapes. Each song is an anthem for coders, creators, and dreamers — an invitation to embrace the digital chaos and celebrate the art of building something from nothing.

From late-night debugging sessions to pushing the latest deploy, DEV’s music is the soundtrack for every developer who knows the rush of seeing their ideas come alive.

Code. Create. Play it loud. Welcome to the world of DEV.</p>
            <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-purple-500 border-opacity-30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">About This Album</h2>
              <p className="text-purple-200 leading-relaxed">{ALBUM_DATA.description}</p>
            </div>

            {/* Track List */}
            <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-purple-500 border-opacity-30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Tracklist</h2>
              <div className="space-y-2">
                {ALBUM_DATA.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(index)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all hover:bg-purple-700 hover:bg-opacity-30 ${
                      currentTrack === index 
                        ? 'bg-gradient-to-r from-cyan-500 from-opacity-20 to-purple-500 to-opacity-20 border border-cyan-400 border-opacity-30' 
                        : 'hover:border hover:border-purple-400 hover:border-opacity-30'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {currentTrack === index && isPlaying ? (
                          <div className="flex space-x-1">
                            <div className="w-1 h-4 bg-cyan-400 animate-pulse"></div>
                            <div className="w-1 h-6 bg-purple-400 animate-pulse delay-75"></div>
                            <div className="w-1 h-3 bg-pink-400 animate-pulse delay-150"></div>
                          </div>
                        ) : (
                          <span className="text-purple-300 font-mono text-sm">
                            {String(track.id).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${currentTrack === index ? 'text-cyan-300' : 'text-white'}`}>
                          {track.title}
                        </p>
                      </div>
                    </div>
                    <span className="text-purple-400 text-sm font-mono">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;