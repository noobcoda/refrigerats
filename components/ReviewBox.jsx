import React from 'react'

export default function ReviewBox({reviews}) {
  return (
    <div className="p-4 bg-gray-300 items-center mx-auto">
        {/*the container*/}
        <div className="grid grid-cols-5 space-x-2">
            <div className="col-span-1">
                <div className="flex-col space-y-6">
                    <div className="outline-dashed flex flex-col items-center bg-[#BFE5D9] text-center justify-center box-border h-20 w-20 sm:h-30 sm:w-30 p-2 border-2">
                        <span className="font-semibold">FOOD</span>
                        <span className="font-extrabold">4.0</span>
                    </div>
                    <div>
                        <div className="outline-dashed flex flex-col items-center bg-[#BFE5D9] text-center justify-center box-border h-20 w-20 sm:h-30 sm:w-30 p-2 border-2">
                            <span className="font-semibold">SERVICE</span>
                            <span className="font-extrabold">3.0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-4 p-2 h-25 overflow-y-auto">
                <span className="font-semibold">Reviewer name</span>
                <div className="mt-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nulla sed maxime velit soluta mollitia totam molestiae libero veritatis excepturi accusamus voluptatibus quod modi magni explicabo recusandae, eaque, quia veniam.
                </div>
            </div>
        </div>
    </div>
  )
}
