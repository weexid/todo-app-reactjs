import React from 'react'

function Loading({ children }) {
    return (
        <div className="todo__loading d-flex justify-content-center align-items-center d-block">
            {children}
        </div>
    )
}

export default Loading
