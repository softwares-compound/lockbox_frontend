import React from "react";
import ReactLoading from "react-loading";

const BrandLoader: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {/* <img src={brandLogo} alt="img" width="200px" /> */}
            <ReactLoading type={"spinningBubbles"} color={"#3c4fc3"} height={100} width={100} />
        </div>
    );
};

export default BrandLoader;