import React, { useState } from 'react'

const ImageContainer = ({ id, secret, server, title }) => {

const [showModal,setShowModal] = useState(false);

  return (
    <>
  
    <img 
    alt={title}
    onClick={()=>setShowModal(!showModal)}
  src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
    />
  {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">{title}</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-white opacity-7 h-6 w-6 text-xl block  bg-black py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <img 
    alt={title}
  src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`}
    />
                 
                </div>
              </div>
            </div>
          </>
        ) : null}
    </>
  
  )
}

export default ImageContainer