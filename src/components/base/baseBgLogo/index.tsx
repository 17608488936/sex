import { Image, View } from "@tarojs/components";
import bgLogoImg from "@/assets/images/common/bg_logo.png";
import logoImg from "@/assets/images/home/首页_slices/logo@2x.png";
import "./index.less";

interface propsItem {
  image?: string;
  isFixed?: boolean;
}
export default function BaseBgLogo(props: propsItem) {
  return (
    <View
      className="bg-logo-wrap"
      style={props.isFixed ? { position: "fixed" } : {}}
    >
      <Image
        fadeIn
        className="bg-logo"
        src={props.image ? logoImg : bgLogoImg}
      />
    </View>
  );
}
