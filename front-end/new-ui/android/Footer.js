import { useAVToggle } from "@100mslive/react-sdk";

function Footer() {
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo
    } = useAVToggle();
    return (
        <div className="control-bar">
            <button className="btn-control" onClick={toggleAudio}>
                {isLocalAudioEnabled ? "Mute" : "Unmute"}
            </button>
            <button className="btn-control" onClick={toggleVideo}>
                {isLocalVideoEnabled ? "Hide" : "unhide"}
            </button>
        </div>
    );
}

export default Footer;