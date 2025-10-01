import React from 'react'

const StepIndicator = () => {
    return (
        <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Order Details</p>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Address</p>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Payment</p>
            </div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>
                <span>4</span>
                <p>Summary</p>
            </div>
        </div>
    )
}

export default StepIndicator
