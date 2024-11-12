import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom";
import { HMSRoomProvider, useHMSActions } from "@100mslive/react-sdk";
import JoinFromStyles from './JoinFormStyles.css';
import JoinForm from './JoinForm';
import Header from "./Header";
import Conference from "./Conference";
import Footer from './Footer';
import Chat from './Chat';
import {
    selectIsConnectedToRoom,
    useHMSStore
} from "@100mslive/react-sdk";

const VideoChatRoomProvider = () => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    useEffect(() => {
        window.onunload = () => {
            if (isConnected){
                hmsActions.leave();
            }
        };
    }, [hmsActions, isConnected]);
    return(
        <div className="App">
            <Header />
            {isConnected ? (
                <>
                    <Conference />
                    <Chat />
                    <Footer />
                </>
            ) : (
                    <JoinForm />
            )}
        </div>
    );
};

export default VideoChatRoomProvider;