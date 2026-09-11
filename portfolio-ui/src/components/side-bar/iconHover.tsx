import Lottie, {LottieRefCurrentProps} from "lottie-react";
import { useRef, useState } from "react";

interface IconHoverProps {
    animatedData: object;
    details: string
}

export default function IconHover(iconHoverDetails: IconHoverProps) {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const handleMouseEnter = () => {
        lottieRef.current?.play();
    };

    const handleMouseLeave = () => {
        lottieRef.current?.stop();
    };

    return (
        <div 
            className={'flex items-center justify-center cursor-pointer transition-all hover:scale-105 tooltip'}
            data-tip={iconHoverDetails.details}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Lottie 
                lottieRef={lottieRef}
                animationData={iconHoverDetails.animatedData} 
                loop={true}
                autoplay={false}
                className="w-[85%] h-[85%]"
            />

            {/* {showTooltip && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-10 shadow-lg">
                    {iconHoverDetails.details}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
            )} */}
        </div>
    );
}

export type { IconHoverProps };