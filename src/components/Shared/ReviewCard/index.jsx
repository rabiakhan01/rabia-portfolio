import React, { useState } from "react";
import { StarIcon } from "../../../assets/icons";

const ReviewCard = ({ image, name, date, rating, description }) => {

    const [showText, setShowText] = useState(false);

    const handelShowText = () => {
        setShowText(true)
    }
    const handelHideText = () => {
        setShowText(false)
    }
    return (
        <div className="flex flex-col gap-2 h-auto w-full sm:w-[49%] lg:w-[49.6%] p-4 md:p-6 bg-whiteColor rounded-3xl">
            <div className="flex  items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex w-10 h-10 lg:w-14 md:h-14 rounded-full overflow-hidden">
                        <img src={image} alt="viewer_image" className="object-cover" />
                    </div>
                    <div className="text-base md:text-xl font-[440]">
                        <p>{name}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm small-tab:text-base">{date}</p>
                </div>
            </div>
            <div className="flex gap-1">
                <StarIcon />
                <p className="font-medium">{rating}</p>
            </div>
            <div>
                <p className={`${showText ? '' : 'line-clamp-5'}  text-sm lg:text-base font-[440]`}>{description}</p>
            </div>
            <div className="">
                {
                    showText ?
                        <button className="underline text-sm lg:text-base uppercase" onClick={handelHideText}>show less</button>

                        :
                        <button className="underline text-sm lg:text-base uppercase" onClick={handelShowText}>read more</button>

                }            </div>
        </div>
    )
}

export default ReviewCard;