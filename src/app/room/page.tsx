"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });

const Room = () => {
  const [videoCall, setVideoCall] = useState(true);

  // Ensure this code runs only on the client-side
  const rtcProps = {
    appId: "3b15a505c106443c959e8ddff67363de",
    channel: "Testing",
    token:
      "007eJxTYPCdYLXxY8n8n4qvbsz4elBzTrfHZgctl7MKZWturTh57tgFBQbjJEPTRFMD02RDAzMTE+NkS1PLVIuUlLQ0M3NjM+OU1ELHnrSGQEaGyOUmLIwMEAjiszOEpBaXZOalMzAAAIwNIu8=",
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return (
    <>
      {videoCall ? (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      ) : (
        <h3 onClick={() => setVideoCall(true)}>Join</h3>
      )}
    </>
  );
};

export default Room;
