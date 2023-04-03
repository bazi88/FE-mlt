import React from 'react';

type PropsType = {
    title?: string;
    children?: JSX.Element
}
const Body = ({ title, children }: PropsType): JSX.Element => {
    return (
        <>
            <div className="container px-5" >
                <div className="flex">
                    <div className='h-full p-4 lg:w-full'>
                        {title ? (<div className="text-lg">{title}</div>) : null}
                    </div>
                </div>
                <div >
                    {children}
                </div>
                {/* <div className="h-full p-4 lg:w-1/3">
                    <div className=" bg-gray-100 px-8 pt-16 pb-16 relative">
                        <h2 className="text-xs mb-1">CATEGORY</h2>
                        <h1 className="title-font sm:text-2xl text-xl  mb-3">Raclette Blueberry Nextious</h1>
                        <p className="mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                        <a className="text-indigo-500 inline-flex items-center">Learn More</a>
                    </div>
                </div>
                <div className="h-full p-4 lg:w-1/3">
                    <div className="bg-gray-100 px-8 pt-16 pb-16 relative">
                        <h2 className="text-xs mb-1">CATEGORY</h2>
                        <h1 className="title-font sm:text-2xl text-xl  mb-3">Ennui Snackwave Thundercats</h1>
                        <p className="mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                        <a className="text-indigo-500 inline-flex items-center">Learn More</a>
                    </div>
                </div>
                <div className="h-full p-4 lg:w-1/3">
                    <div className="bg-gray-100 px-8 pt-16 pb-16 relative">
                        <h2 className="text-xs mb-1">CATEGORY</h2>
                        <h1 className="title-font sm:text-2xl text-xl mb-3">Selvage Poke Waistcoat</h1>
                        <p className="mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                        <a className="text-indigo-500 inline-flex items-center">Learn More</a>
                    </div>
                </div> */}
            </div>
            

        </>
    )
}

export default Body;