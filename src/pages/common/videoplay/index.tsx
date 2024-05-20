import Taro, { useRouter } from "@tarojs/taro";
import BaseVideo from "@/components/base/baseVideo";
import "./index.less";

// 视频播放
export default function VideoPlay() {
  const router = useRouter<{ url: string; title: string }>();
  Taro.setNavigationBarTitle({ title: router.params.title });
  return (
    <BaseVideo
      autoplay
      src={router.params.url}
      className="video-play"
    ></BaseVideo>
  );
}
