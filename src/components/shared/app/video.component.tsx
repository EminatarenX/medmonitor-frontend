interface Props {
  video?: React.RefObject<HTMLVideoElement> | null
  width?: string
}

export const VideoComponent = ({ video, width }: Props) => {
  return (
    <div className={`flex relative`}>
      <video 
        ref={video} 
        // muted 
        autoPlay 
        playsInline 
        className={`w-${width} h-auto md:w-auto object-cover object-center md:object-contain transform scale-x-[-1]`}
      /> 
    </div>
  )
}
