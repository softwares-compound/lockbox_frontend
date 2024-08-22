import React from "react";
import ReactLoading from "react-loading";
import brandLogo from "@/assets/logo_full.png"

const BrandLoader: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <img src={brandLogo} alt="img" width="200px" />
            <ReactLoading type={"bars"} color={"#3c4fc3"} height={150} width={150} />
        </div>
    );
};

export default BrandLoader;