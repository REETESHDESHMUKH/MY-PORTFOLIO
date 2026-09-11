import { Avatar } from "./avatar";
import avatarImage from "../../data/images/Avatar.jpg";
import Details, { DetailsProps } from "./details";
import emailAnimatedJson from "../../data/animatedIcons/emailAnimated.json";
import callAnimatedJson from "../../data/animatedIcons/callAnimated.json";
import dateAnimatedJson from "../../data/animatedIcons/dateAnimated.json";
import locationAnimatedJson from "../../data/animatedIcons/locationAnimated.json";
import instagramAnimatedJson from "../../data/animatedIcons/instagramAnimated.json";
import githubAnimatedJson from "../../data/animatedIcons/githubAnimated.json";
import linkedinAnimatedJson from "../../data/animatedIcons/linkedinAnimated.json";

import IconHover, { IconHoverProps } from "./iconHover";

export default function Sidebar() {
    const detailsArray: Array<DetailsProps> = [
        {
            animatedData: emailAnimatedJson,
            heading: "EMAIL",
            detail: "reeteshd29@gmail.com"
            // source : https://lordicon.com/icons/wired/outline/3090-document-letter 
        },
        {
            animatedData: callAnimatedJson,
            heading: "PHONE",
            detail: "+91 7828771302"
            // source : https://www.freepik.com/animated-icon/phone_19017251#fromView=search&page=1&position=41&uuid=fcd54912-b45d-42eb-8190-08ba07a8034c&log-in=google
        },
        {
            animatedData: dateAnimatedJson,
            heading: "BIRTHDAY",
            detail: "01 December 2025"
            // source : https://www.freepik.com/animated-icon/phone_19017251#fromView=search&page=1&position=41&uuid=fcd54912-b45d-42eb-8190-08ba07a8034c&log-in=google
        },
        {
            animatedData: locationAnimatedJson,
            heading: "LOCATION",
            detail: "Bangalore, India"
            // source : https://www.freepik.com/animated-icon/phone_19017251#fromView=search&page=1&position=41&uuid=fcd54912-b45d-42eb-8190-08ba07a8034c&log-in=google
        }
    ]

    const iconHoverArray: Array<IconHoverProps> = [
        {
            animatedData: instagramAnimatedJson,
            details: "SKYRIX"
        },
        {
            animatedData: linkedinAnimatedJson,
            details: "reetesh-deshmukh"
        },
        {
            animatedData: githubAnimatedJson,
            details: "REETESHDESHMUKH"
        }
    ]
    return (
        <div className="flex flex-col gap-10 py-4">
            <div className="w-auto h-[30vh] px-auto flex flex-col items-center justify-center gap-4">
                <Avatar size="xl" fallback="RD" src={avatarImage.src} />
                <p className="font-mono text-xl font-bold" > Reetesh Deshmukh </p>
                <span className="px-4 py-1.5 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold shadow-lg">
                    Software Developer
                </span>
            </div>
            <hr className="w-[75%] mx-auto h-px bg-neutral-400 border-0 rounded-md"></hr>
            <div className="w-auto h-[35vh] flex flex-col gap-4 px-6">
                {detailsArray.map((detail, index) => (
                    <Details 
                        key={index}
                        animatedData={detail.animatedData}
                        heading={detail.heading}
                        detail={detail.detail}
                    />))
                }
            </div>
            <div className="h-[8vh] flex flex-row justify-center gap-3">
                {iconHoverArray.map((detail, index) => (
                    <IconHover 
                        key={index}
                        animatedData={detail.animatedData}
                        details={detail.details}
                    />))
                }
            </div>
        </div>
    );
}