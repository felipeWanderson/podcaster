import { createContext, ReactNode, useState, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setIsplayingState: (state: boolean) => void;
  tooglePlay: () => void;
  toogleLoop: () => void;
  toogleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}
const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrev = currentEpisodeIndex > 0;
  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }
  function toogleLoop() {
    setIsLooping(!isLooping);
  }
  function toogleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setIsplayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex); 
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrev) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        isLooping,
        isShuffling,
        tooglePlay,
        toogleLoop,
        toogleShuffle,
        setIsplayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrev
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}