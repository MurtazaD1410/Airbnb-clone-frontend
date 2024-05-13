import React from 'react'

const CreateLoader = () => {
  return (
    <div className="loader w-screen fixed left-0 top-0  h-screen bg-white/90 z-50">
      <div className="flex justify-center items-center h-screen">
        <div className="-translate-y-1/2 ">
          <lord-icon
            src="https://cdn.lordicon.com/rqqkvjqf.json"
            trigger="loop"
            colors="primary:#484848,secondary:#3d91ff"
            style={{
              width: '150px',
              height: '150px',
            }} />

        </div>
      </div>
    </div>
  )
}

export default CreateLoader