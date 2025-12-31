import { useState, useEffect, useCallback } from "react";
import { Direction } from "../engine/types";

const useArrowKeys = () => {
    const [arrowDirection, setArrowDirection] = useState<Direction>();
    
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const newArrowDirection = event?.key as Direction;
        setArrowDirection(newArrowDirection);
    }, []);
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => { 
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return { arrowDirection };
}

export default useArrowKeys;