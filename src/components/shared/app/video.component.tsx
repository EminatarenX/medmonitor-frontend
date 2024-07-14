interface Props {
    video?: React.RefObject<HTMLVideoElement> | null
    width?: string
}

export const VideoComponent = ({video, width}: Props) => {
  return (
    <div className={`flex relative`}>
        {video && <video ref={video} muted autoPlay playsInline className={`w-${width}  h-auto md:h-full md:w-auto object-cover object-center md:object-contain`}/>  }
    </div>

  )
}
