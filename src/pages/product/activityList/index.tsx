import { View } from "@tarojs/components";
import { WaterfallFlow } from "@antmjs/vantui";
import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import CardProductListItem from "@/components/card/productListItem";
import { productPage } from "@/apis/product";
import { IProduct } from "@/types/product";
import "./index.less";

export default function ActivityList() {
  const router = useRouter<{ ids?: string }>();
  const [list, setList] = useState<
    (IProduct & { key: IProduct["id"]; isCutPrice: boolean })[]
  >([]);

  useEffect(() => {
    getProductPage();
  }, []);

  const getProductPage = async () => {
    let _ids: string[] = [];
    const { ids } = router.params;
    if (ids) {
      _ids = JSON.parse(ids) as string[];
    }
    const res = await productPage({
      type: "resource",
      ids: _ids,
    });
    setList(
      res.map((w, index) => ({
        key: w.id,
        ...w,
        isCutPrice: index % 2 === 0 ? true : false,
      }))
    );
  };

  const renderItem = (item: IProduct) => {
    return (
      <CardProductListItem
        item={{
          id: item.id,
          url: item.data,
          desc: item.name,
        }}
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/product/selectProduct/index?id=${item.id}`,
          })
        }
      />
    );
  };

  return (
    <View className="wrap-container-space-16">
      <WaterfallFlow
        dataSource={list}
        columnNum={2}
        gutter={8}
        renderItem={renderItem}
        calculationDelay={1000}
      />
    </View>
  );
}
