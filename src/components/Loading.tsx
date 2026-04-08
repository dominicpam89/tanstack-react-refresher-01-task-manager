import loadingVideo from '@/assets/loading.webm'

const LoadingUI = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <video
        src={loadingVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '120px', height: '120px' }}
      />
      <p className="text-xs animate-pulse">Loading Tasks</p>
    </div>
  )
}

export default LoadingUI
