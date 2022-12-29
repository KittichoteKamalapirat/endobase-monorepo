import { useState, useEffect } from "react"
const screens = {
    'xs': '475px',

    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
}



type ScreenValues = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export const getBreakpointValue = (value: string): number => {
    const numStr = (screens as any)?.[value]
        .slice(0, (screens as any)?.[value].indexOf('px'))

    return Number(numStr)
};


export const getCurrentBreakpoint = (): string => {
    let currentBreakpoint: string = "";
    let biggestBreakpointValue = 0;
    for (const breakpoint of Object.keys(screens as any)) {
        const breakpointValue = getBreakpointValue(breakpoint);
        if (
            breakpointValue > biggestBreakpointValue &&
            window.innerWidth >= breakpointValue
        ) {
            biggestBreakpointValue = breakpointValue;
            currentBreakpoint = breakpoint;
        }
    }
    return currentBreakpoint;
};

export const useScreenIsLargerThan = (screen: ScreenValues) => {

    const [isLarger, setIsLarger] = useState(false)

    const breakpointSize = getBreakpointValue(screen)

    const handleResize = () => {
        if (window.innerWidth > breakpointSize) {
            setIsLarger(true)
        } else {
            setIsLarger(false)
        }
    }


    useEffect(() => {
        handleResize() // run this for the first time
        window.addEventListener("resize", handleResize, false);
        return () => window.removeEventListener("resize", handleResize);

    }, []);


    return isLarger
}