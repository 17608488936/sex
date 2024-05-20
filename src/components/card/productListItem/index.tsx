import { View, Image } from "@tarojs/components";
import "./index.less";

interface IProps {
  item: { id: string; url: string; desc: string; typeName?: string };
  onClick?: () => void;
}

export default function CardProductListItem({ item, onClick }: IProps) {
  return (
    <View className="product-list-card-item-wrap" onClick={onClick}>
      <View className="product-list-card-item-img-wrap">
        {item.typeName && (
          <View className="product-list-card-item-tag">{item.typeName}</View>
        )}
        <Image
          fadeIn
          src={item.url}
          className="product-list-card-item-img"
          mode="aspectFit"
        />
      </View>
      <View className="product-list-card-item-desc van-multi-ellipsis--l2">
        {item.desc}
      </View>
    </View>
  );
}
