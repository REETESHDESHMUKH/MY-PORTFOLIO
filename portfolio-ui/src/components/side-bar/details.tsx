import Lottie, {LottieRefCurrentProps} from "lottie-react";
import { useRef } from "react";

interface DetailsProps {
    animatedData?: object, 
    heading?: string,
    detail?: string
};

export default function Details(details: DetailsProps) {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const handleMouseEnter = () => {
        lottieRef.current?.play();
    };

    const handleMouseLeave = () => {
        lottieRef.current?.stop();
    };
    
    return (
        <div className="flex flex-row gap-2 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-12 h-12 rounded-xl bg-white/20">
                <Lottie 
                    lottieRef={lottieRef}
                    animationData={details.animatedData} 
                    loop={true}
                    autoplay={false}
                    className="w-full h-full"
                />
            </div>
            <div className="w-60 h-10 rounded-xl pt-1">
                <p className="font-semibold text-xs"> {details.heading} </p>
                <p className="font-semibold text-md"> {details.detail} </p>
            </div>
        </div>
    );
}

export type {DetailsProps};