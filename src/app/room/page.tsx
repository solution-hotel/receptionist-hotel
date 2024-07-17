"use client";

// import "@livekit/components-styles";
// import {
//   LiveKitRoom,
//   GridLayout,
//   ParticipantTile,
//   RoomAudioRenderer,
//   ControlBar,
//   useTracks,
// } from "@livekit/components-react";
// import { useEffect, useState } from "react";
// import { Track } from "livekit-client";
// import { useSearchParams } from "next/navigation";

// export default function RoomCall() {
//   const params = useSearchParams();

//   useEffect(() => {
//     const room = params.get("room");
//     const name = params.get("name");
//     if (room && name) {
//       setRoom(room);
//       setName(name);
//     }
//   }, [params]);

//   const [room, setRoom] = useState<string>();
//   const [name, setName] = useState<string>();

//   const [token, setToken] = useState(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjAxNjU4MTAsImlzcyI6IkFQSVAzdkdGdGJ3aVJMciIsIm5iZiI6MTcyMDE2NDkxMCwic3ViIjoiZGZzZGYiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiMTIzIiwicm9vbUpvaW4iOnRydWV9fQ.2lGtaFssU7QglrhTjVyykpmkUoySJyP9SyNLIxOreZg"
//   );

//   const handleLogOut = async () => {
//     await setToken("");
//     console.log("Hello World Logout");
//   };

//   const handleLogIn = () => {
//     console.log("Hello World Login");
//   };

//   async function getToken() {
//     if (!room || !name) {
//       return;
//     }
//     try {
//       const resp = await fetch(
//         `/api/get-participant-token?room=${room}&username=${name}`
//       );
//       const data = await resp.json();
//       setToken(
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjAxNjU4MTAsImlzcyI6IkFQSVAzdkdGdGJ3aVJMciIsIm5iZiI6MTcyMDE2NDkxMCwic3ViIjoiZGZzZGYiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiMTIzIiwicm9vbUpvaW4iOnRydWV9fQ.2lGtaFssU7QglrhTjVyykpmkUoySJyP9SyNLIxOreZg"
//       );
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   if (token === "") {
//     return (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           getToken();
//         }}
//         className="flex flex-col justify-center items-center min-h-screen"
//       >
//         <input
//           type="text"
//           placeholder="Room"
//           value={room}
//           className="mb-4 ring-1 ring-gray-300"
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           className="mb-4 ring-1 ring-gray-300"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button
//           onClick={() => handleLogIn()}
//           type="submit"
//           className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//         >
//           Join
//         </button>
//       </form>
//     );
//   }

//   return (
//     <LiveKitRoom
//       video={true}
//       audio={true}
//       token={token}
//       serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
//       onDisconnected={() => handleLogOut()}
//       // Use the default LiveKit theme for nice styles.
//       data-lk-theme="default"
//       style={{ height: "100dvh" }}
//     >
//       {/* Your custom component with basic video conferencing functionality. */}
//       <MyVideoConference />
//       {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
//       <RoomAudioRenderer />
//       {/* Controls for the user to start/stop audio, video, and screen
//       share tracks and to leave the room. */}
//       <ControlBar />
//     </LiveKitRoom>
//   );
// }

// function MyVideoConference() {
//   // `useTracks` returns all camera and screen share tracks. If a user
//   // joins without a published camera track, a placeholder track is returned.
//   const tracks = useTracks(
//     [
//       { source: Track.Source.Camera, withPlaceholder: true },
//       { source: Track.Source.ScreenShare, withPlaceholder: false },
//     ],
//     { onlySubscribed: false }
//   );
//   return (
//     <GridLayout
//       tracks={tracks}
//       style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
//     >
//       {/* The GridLayout accepts zero or one child. The child is used
//       as a template to render all passed in tracks. */}
//       <ParticipantTile />
//     </GridLayout>
//   );
// }

import { useState, useEffect } from "react";
import AgoraUIKit, { EndCall } from "agora-react-uikit";

const Room = () => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: "3b15a505c106443c959e8ddff67363de",
    channel: "Testing",
    token:
      "007eJxTYPCdYLXxY8n8n4qvbsz4elBzTrfHZgctl7MKZWturTh57tgFBQbjJEPTRFMD02RDAzMTE+NkS1PLVIuUlLQ0M3NjM+OU1ELHnrSGQEaGyOUmLIwMEAjiszOEpBaXZOalMzAAAIwNIu8=",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  
//   const checkCompatibility = () => {
//     if (!extension.current.checkCompatibility()) {
//       console.error("Does not support virtual background!");
//       return;
//     }
//   };

//   useEffect(() => {
//     const initializeVirtualBackgroundProcessor = async () => {
//       AgoraRTC.registerExtensions([extension.current]);
//       checkCompatibility();
//       console.log("Initializing virtual background processor...");
//       try {
//         processor.current = extension.current.createProcessor();
//         await processor.current.init(wasm);
//         localCameraTrack
//           .pipe(processor.current)
//           .pipe(agoraContext.localCameraTrack.processorDestination);
//         processor.current.setOptions({ type: "color", color: "#00ff00" });
//         await processor.current.enable();
//       } catch (error) {
//         console.error("Error initializing virtual background:", error);
//       }
//     };

//     void initializeVirtualBackgroundProcessor();

//     return () => {
//       const disableVirtualBackground = async () => {
//         processor.current?.unpipe();
//         localCameraTrack?.unpipe();
//         await processor.current?.disable();
//       };
//       void disableVirtualBackground();
//     };
//   }, [localCameraTrack]);

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
};

export default Room;
