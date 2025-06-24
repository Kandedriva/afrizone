import './LoadingScreen.css'

const LoadingSreen = ()=>{
    return(<>
        <div className='loadingOverlay'>
        <div className='loadingText'><h2>Loading...</h2></div>
            <div className='spinner'></div>
            
        </div>
    </>)
}

export default LoadingSreen;