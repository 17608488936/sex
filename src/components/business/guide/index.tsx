import { Overlay } from "@antmjs/vantui";
import { useState } from "react";
import guideImg from "@/assets/images/common/guide.png";
import { Image, View } from "@tarojs/components";
import "./index.less";

interface IBusinessGuideProps {
  content: string;
  btnText?: string;
  onClick?: () => void;
}
export default function BusinessGuide({
  content,
  btnText = "知道了",
  onClick,
}: IBusinessGuideProps) {
  const [show, setShow] = useState(true);
  return (
    <Overlay show={show}>
      <Image fadeIn className="business-guide-img" src={guideImg} />
      <View className="business-guide-box">
        <View className="business-guide-box-arrow"></View>
        {content}
      </View>
      <View
        className="business-guide-btn"
        onClick={() => {
          setShow(false);
          onClick?.();
        }}
      >
        {btnText}
      </View>
    </Overlay>
  );
}
