import { CoverView, Video } from "@tarojs/components";

interface IBaseVideoProps {
  isCoverView: boolean;
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  showPlayBtn?: boolean;
  isPlay?: boolean;
}
export default function BaseVideo({
  src,
  poster,
  className,
  controls = true,
  autoplay = false,
  showPlayBtn = true,
  isCoverView = false,
}: IBaseVideoProps) {
  //

  return (
    <>
      <Video
        className={className}
        onWaiting={(e) => {
          console.log(e, "开始混村了");
        }}
        onPlay={(e) => {
          console.log(e, "开始播放");
        }}
        src={src}
        poster={poster}
        autoplay={autoplay}
        playBtnPosition="center"
        initialTime={0}
        loop
        controls={controls}
        pageGesture
        showScreenLockButton
        showPlayBtn={showPlayBtn}
        preferredPeakBitRate={1}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {isCoverView ? <CoverView className="controls"></CoverView> : null}
      </Video>
    </>
  );
}
