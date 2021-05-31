import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./index.css";

// const [dormant, enteringText, sendingEmail, waitingForConfirmation] = [
//   Symbol('dormant'),
//   Symbol('enteringText'),‰
//   Symbol('sendingEmail'),
//   Symbol('waitingForConfirmation'),
// ];

const duration = "duration-1000"; // 'duration-1000';


const Suoli = ({ ...className }) => {
  const [state, setState] = useState(0);
  const [bigHovering, setBigHovering] = useState(false);
  const [LittleHovering, setLittleHovering] = useState(false);
  const bigRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const littleRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowRight") {
        setState((state) => (state + 1) % 4);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });

  useEffect(() => {
    const handleMouse = ({ clientX, clientY }: MouseEvent) => {
      const target = document.elementFromPoint(clientX, clientY);
      setBigHovering(bigRefs.some((ref) => ref.current?.contains(target)));
      setLittleHovering(
        littleRefs.some((ref) => ref.current?.contains(target))
      );
    };
    document.addEventListener("mouseover", handleMouse);
    document.addEventListener("mouseout", handleMouse);
    return () => {
      document.removeEventListener("mouseover", handleMouse);
      document.removeEventListener("mouseout", handleMouse);
    };
  });

  // Sending email to ...
  //   Follow the linke we just sent to ...
  // Please sign in
  // Follow the link sent to email@address.com to continue

  // Authenticated
  // Starting session

  const squish = 2.75 / 3.5;
  const unsquish = 3.5 / 2.75;

  const transformTopHalfBg = state === 0 ? "scaleY(0)" : ""; // (3.5rem)
  const transformLayer3 =
    state === 0 ? `translateY(-3.5rem) scaleY(${squish})` : "";
  const transformLayer4 = state === 0 ? "translateY(-4.25rem)" : "";
  const transformText =
    state === 0 ? `scaleY(${unsquish})` : `scale(${squish})`;

  const buttonColor =
    state === 0 && bigHovering ? "bg-gray-400" : "bg-gray-300";
  const littleButtonColor =
    state === 1 && LittleHovering ? "bg-blue-500" : "bg-blue-300";

  return (
    <div {...className}>
      <div className="flex-col ">
        <div
          ref={bigRefs[0]}
          className={clsx(buttonColor, "w-72 h-2 rounded-t-lg .shadow-2xl")}
        />

        <div className="grid w-72 h-14 justify-center items-center">
          {/* Top half */}
          <div
            // Top half bg
            style={{
              transform: transformTopHalfBg,
              transformOrigin: "top",
              transitionProperty: "transform"
            }}
            ref={bigRefs[1]}
            className={clsx(
              buttonColor,
              "w-72 h-full  ease-in-out .transition-transform grid-overlay .shadow-2xl",
              duration
            )}
          />
          {state === 3 ? (
            <div className=" text-gray-900 flex-col grid-overlay items-center text-sm leading-normal font-medium">
              <div className="text-base font-bold  animate-bounce">
                Follow the link sent to
              </div>
              <div> email@address.com</div>
            </div>
          ) : state === 2 ? (
            <div className="flex-col grid-overlay items-center text-sm leading-normal font-medium">
              <div className=" ">Sending magic link to</div>
              <div> email@address.com</div>
            </div>
          ) : (
            <input
              // Top half input
              className="h-8 w-64 p-2 mx-4 grid-overlay transform-gpu rounded-sm"
              placeholder="email@address.com"
            />
          )}
        </div>

        <div
          // Bottom half bg

          ref={bigRefs[2]}
          className={clsx(
            buttonColor,
            " w-72 h-14  justify-center items-center ease-in-out transform-gpu .transition-transform grid-overlay grid .shadow-2xl",
            duration
          )}
          style={{
            transform: transformLayer3,
            transformOrigin: "top",
            transitionProperty: "transform"
          }}
        >
          {/* Bottom half */}
          {state === 3 ? (
            <Loader type="ThreeDots" color="dimgray" height="40" width="40" />
          ) : state === 2 ? (
            <Loader type="Oval" color="dimgray" height="40" width="40" />
          ) : (
            <>
              <div
                // Bottom half button bg
                ref={littleRefs[0]}
                className={clsx(
                  littleButtonColor,
                  "h-8 w-48 grid-overlay ease-in-out transition-opacity transform-gpu rounded-md shadow-md",
                  state === 0 ? "opacity-0" : "opacity-100",
                  duration
                )}
              />
              <div
                // Bottom half text
                ref={littleRefs[1]}
                style={{ transform: transformText, transitionProperty: "transform" }}
                className={clsx(
                  "grid-overlay text-xl ease-in-out font-semibold .transition-transform justify-center transform-gpu items-center",
                  duration,

                )}
              >
                Sign up or login
              </div>
            </>
          )}
        </div>

        <div
          style={{ transform: transformLayer4, transitionProperty: "transform" }}
          ref={bigRefs[3]}
          className={clsx(
            buttonColor,
            ".shadow-2xl ease-in-out w-72 h-2 rounded-b-lg .transition-transform transform-gpu",
            duration
          )}
        />
      </div>
    </div>
  );
};

export { Suoli };
