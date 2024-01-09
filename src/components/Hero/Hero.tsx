import { useNavigate } from 'react-router-dom';
import '../../assets/scss/Hero.scss'
import React from 'react';

interface HeroProps {
    writeUp: string;
}

const Hero: React.FC<HeroProps> = ({writeUp}) => {
    const navigate = useNavigate();

    return <div className="heroSection h-screen">
        <div className="flex justify-between items-end w-full py-4 px-8 z-50">
            <div className="font-bold text-xl md:text-3xl text-white cursor-pointer" onClick={() => navigate("/")}>RrSoft</div>
            <button className="text-white bg-green-500 rounded px-3 py-1" onClick={() => navigate("/new-post")}>Create Article</button>
        </div>
        <div className="px-8 md:px-20">
            <h3 className="font-bold text-5xl md:text-7xl text-white mt-20 w-1/2 leading-10">{writeUp}</h3>
        </div>
    </div>
}

export default Hero