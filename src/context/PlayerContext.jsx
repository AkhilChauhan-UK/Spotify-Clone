import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = (id) => {
        const selectedTrack = songsData.find(song => song.id === id);
        if (selectedTrack) {
            setTrack(selectedTrack);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                    setPlayStatus(true);
                }
            }, 0);
        }
    };

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play()
            setPlayStatus(true);
        }
    }

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play()
            setPlayStatus(true);
        }
    }


    const seekSong = async (e) =>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth*audioRef.current.duration))

    }






    // Update currentTime and totalTime while playing

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            let ct = audio.currentTime || 0;
            let tt = audio.duration || 0;

            setTime({
                currentTime: {
                    second: Math.floor(ct % 60) || 0,
                    minute: Math.floor(ct / 60) || 0,
                },
                totalTime: {
                    second: Math.floor(tt % 60) || 0,
                    minute: Math.floor(tt / 60) || 0,
                },
            });

            if (seekBar.current && tt > 0) {
                seekBar.current.style.width = `${(ct / tt) * 100}%`;
            }
        };

        const setDurationOnLoad = () => {
            let tt = audio.duration || 0;
            setTime(prev => ({
                ...prev,
                totalTime: {
                    second: Math.floor(tt % 60) || 0,
                    minute: Math.floor(tt / 60) || 0,
                }
            }));
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setDurationOnLoad); // ✅ important

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setDurationOnLoad);
        };
    }, []);


    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {/* 🎵 Hidden audio element */}
            <audio ref={audioRef} src={track?.file}></audio>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
