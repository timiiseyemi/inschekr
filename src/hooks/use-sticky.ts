"use client"
import { useEffect, useState } from "react";

const useSticky = () => {
    const [sticky,setSticky] = useState(false);
    const [scrolled,setScrolled] = useState(false);

    const stickyHeader = () => {
        const y = window.scrollY || window.pageYOffset;
        setScrolled(y > 10);
        setSticky(y > 80);
    }

    useEffect(() => {
        window.addEventListener('scroll',stickyHeader);
        // run once to set initial state
        stickyHeader();
        return () => window.removeEventListener('scroll',stickyHeader);
    },[]);

    return {
        sticky,
        scrolled,
    }

}

export default useSticky;