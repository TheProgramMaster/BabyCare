import { useVideo } from "@100mslive/react-sdk";

function Peer({ peer }){
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });
    return (
        <div className="peer-container">
            <video
                ref={videoRef}
                className={`peer-video ${peer.isLocal ? "local" : ""}`}
                autoPlay
                muted
                playsInline
            />
            <div className="peer-name">
                {peer.name} {peer.isLocal ? "(You)" : ""}
            </div>    
        </div>
    );
}

export default Peer;