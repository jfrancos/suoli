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
const emailRegex = /^.+@\S+$/;

const Suoli = ({ onEmail: handleEmail, error, emailSent, ...className }) => {
  const [state, setState] = useState(0);
  const [bigHovering, setBigHovering] = useState(false);
  const [LittleHovering, setLittleHovering] = useState(false);
  // const [email, setEmail] = useState("");
  const [email, setEmail] = useState("justinfrancos@gmail.com");
  const inputRef = useRef(null);
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
  const validEmail = email.match(emailRegex);

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

  const handleInput = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleMainClick = () => {
    setState((state) => {
      if (state === 0) {
        return 1;
      } else {
        return state;
      }
    });
  };

  useEffect(() => {
    if (emailSent) {
      setState(3);
    }
  }, [emailSent]);

  useEffect(() => {
    if (error) {
      setState(1);
    }
  });

  useEffect(() => {
    if (state === 1) {
      inputRef.current.focus();
    }
  });

  const handleLittleClick = () => {
    if (state !== 1 || !validEmail) {
      return;
    }
    handleEmail(email);
    setState(2);
  };

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
    state === 1 && LittleHovering && validEmail
      ? "bg-blue-500"
      : validEmail
      ? "bg-blue-300"
      : "bg-gray-200";

  return (
    <div {...className} onClick={handleMainClick}>
      <div className="grid">
        {error && (
          <div className="grid-overlay bg-opacity-0 .h-full justify-center items-center text-xs text-red-700 .bg-gray-300 px-4 font-semibold w-72 z-10 pointer-events-none">
            {error}
          </div>
        )}
        <div className="flex-col cursor-default grid-overlay bg-transparent">
          <div
            ref={bigRefs[0]}
            className={clsx(buttonColor, "w-72 h-2 rounded-t-lg .shadow-2xl")}
          />

          <div className={clsx("grid w-72 h-14 justify-center items-center")}>
            {/* Top half */}
            <div
              // Top half bg
              style={{
                transform: transformTopHalfBg,
                transformOrigin: "top",
                transitionProperty: "transform",
              }}
              ref={bigRefs[1]}
              className={clsx(
                buttonColor,
                "w-72 h-full  ease-in-out .transition-transform grid-overlay .shadow-2xl",
                duration
              )}
            />
            {state === 3 ? (
              <div className="text-gray-900 flex-col grid-overlay items-center text-sm leading-normal font-medium">
                <div className="text-base font-bold  animate-bounce">
                  Follow the link sent to
                </div>
                <div>{email}</div>
              </div>
            ) : state === 2 ? (
              <div className="flex-col grid-overlay items-center text-sm leading-normal font-medium">
                <div className=" ">Sending magic link to</div>
                <div>{email}</div>
              </div>
            ) : (
              <input
                // Top half input
                type="email"
                value={email}
                onChange={handleInput}
                ref={inputRef}
                className={clsx(
                  "h-8 w-64 p-2 mx-4 grid-overlay transform-gpu rounded-sm",
                  error && "mb-4"
                )}
                placeholder="email@address.com"
              />
            )}
          </div>

          <div
            // Bottom half bg
            ref={bigRefs[2]}
            className={clsx(
              buttonColor,
              " w-72 h-14  justify-center items-center ease-in-out transform-gpu .transition-transform grid-overlay grid .shadow-2xl items-center",
              // error ? "items-end" : "items-center",

              duration
            )}
            style={{
              transform: transformLayer3,
              transformOrigin: "top",
              transitionProperty: "transform",
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
                  // {validEmail.length > 0 || disabled}
                  onClick={handleLittleClick}
                  ref={littleRefs[0]}
                  className={clsx(
                    littleButtonColor,
                    validEmail && "shadow-md",
                    "h-8 w-48 grid-overlay ease-in-out transition-opacity transform-gpu rounded-md",
                    error && "mt-4",
                    state === 0 ? "opacity-0" : "opacity-100",
                    duration
                  )}
                />
                <div
                  // Bottom half text
                  onClick={handleLittleClick}
                  ref={littleRefs[1]}
                  style={{
                    transform: transformText,
                    transitionProperty: "transform",
                  }}
                  className={clsx(
                    "grid-overlay text-xl ease-in-out font-semibold .transition-transform justify-center transform-gpu items-center",
                    error && "mt-4",
                    duration
                  )}
                >
                  Sign up or login
                  {/* gray out text and/or make transparent */}
                </div>
              </>
            )}
          </div>

          <div
            style={{
              transform: transformLayer4,
              transitionProperty: "transform",
            }}
            ref={bigRefs[3]}
            className={clsx(
              buttonColor,
              ".shadow-2xl ease-in-out w-72 h-2 rounded-b-lg .transition-transform transform-gpu",
              duration
            )}
          />
        </div>
      </div>
    </div>
  );
};

export { Suoli };
