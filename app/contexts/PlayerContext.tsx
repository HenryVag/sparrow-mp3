import { useAudioPlayer } from "expo-audio";
import { createContext, ReactNode, useEffect, useState } from "react";

export type FileItem = {
  fileName: string;
  fileURI: string;
  fileIndex: number;
};

type PlayerContextValue = {
  currentSongURI: string;
  currentSongName: string;
  isPlaying: boolean;
  songs: FileItem[];
  currentIndex: number;
  setSongs: React.Dispatch<React.SetStateAction<FileItem[]>>;
  play: (URI: string, name: string) => Promise<void>;
  pause: () => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  setCurrentSongURI: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSongName: React.Dispatch<React.SetStateAction<string>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext<PlayerContextValue | undefined>(
  undefined
);

const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const [currentSongURI, setCurrentSongURI] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongName, setCurrentSongName] =
    useState<string>("No song selected");

  const [songs, setSongs] = useState<FileItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const player = useAudioPlayer(currentSongURI || "");

  async function reset() {
    setCurrentSongName("No song selected");
    setCurrentIndex(null);
    setCurrentSongURI(null);
    setSongs([]);
  }

  function play(URI: string, name: string) {
    if (isPlaying) {
      player.replace(URI);
      setCurrentSongURI(URI);
    } else {
      setCurrentSongURI(URI);
      setIsPlaying(true);
    }
    setCurrentSongName(name);
  }

  useEffect(() => {
    if (!currentSongURI) return;
    if (isPlaying) {
      player.play();
    }
  }, [currentSongURI, isPlaying]);

  async function pause() {
    setIsPlaying(false);
    player.pause();
  }

  function next() {
    console.log(currentIndex);
    if (currentIndex !== null && currentIndex < songs.length - 1) {
      let nextIndex = currentIndex + 1;
      let nextSong = songs[nextIndex];
      let nextSongURI = nextSong.fileURI;
      player.replace(nextSongURI);
      setCurrentSongName(nextSong.fileName);
      setCurrentSongURI(nextSong.fileURI);
      setCurrentIndex(nextIndex);
    }
  }

  function prev() {
    console.log(currentIndex);
    if (currentIndex !== null && currentIndex > 0) {
      let prevIndex = currentIndex - 1;
      let prevSong = songs[prevIndex];
      let prevSongURI = prevSong.fileURI;
      player.replace(prevSongURI);
      setCurrentSongName(prevSong.fileName);
      setCurrentSongURI(prevSong.fileURI);
      setCurrentIndex(prevIndex);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSongURI,
        currentSongName,
        isPlaying,
        currentIndex,
        play,
        pause,
        next,
        prev,
        setCurrentSongURI,
        setCurrentSongName,
        setIsPlaying,
        setSongs,
        setCurrentIndex,
        reset,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;