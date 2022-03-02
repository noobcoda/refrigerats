import React from 'react'

export default function ReviewBox({reviews}) {
  return (
    <div className="p-4 items-center rounded-md bg-white mx-auto hover:shadow-md">
        {/*the container*/}
        {reviews?.map((review)=>(
            <div className="grid grid-cols-5 space-x-2">
                <div className="col-span-1">
                    <div className="flex-col space-y-6">
                        <div className="outline-dashed flex flex-col items-center bg-[#BFE5D9] text-center justify-center box-border h-20 w-20 sm:h-30 sm:w-30 p-2 border-2">
                            <span className="font-semibold">FOOD</span>
                            <span className="font-extrabold">{review?.data().qualityOfFood}</span>
                        </div>
                        <div>
                            <div className="outline-dashed flex flex-col items-center bg-[#BFE5D9] text-center justify-center box-border h-20 w-20 sm:h-30 sm:w-30 p-2 border-2">
                                <span className="font-semibold">SERVICE</span>
                                <span className="font-extrabold">{review?.data().serviceRating}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-2 h-25 overflow-y-auto">
                    <span className="font-semibold">{review?.data().name}</span>
                    <div className="mt-5">
                        {review?.data().comment}
                    </div>
                </div>
            </div>
        ))}
        
    </div>
  )
}
