import React from 'react'

const Loader = () => {
  return (
    <div className="loader w-screen fixed left-0 top-0  h-screen bg-white/90 z-50">
      <div className="flex justify-center items-center h-screen">
        <div className="-translate-y-1/2 ">
          <lord-icon
            // src="https://cdn.lordicon.com/wlpxtupd.json"
            src="https://cdn.lordicon.com/cvpqeffe.json"
            trigger="loop"
            colors="primary:#484848,secondary:#3d91ff"
            style={{
              width: '200px',
              height: '200px',
            }} />

        </div>
      </div>
    </div>
  )
}

export default Loader