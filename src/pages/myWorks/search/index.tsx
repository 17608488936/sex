import { Text, View } from "@tarojs/components";
import {
  Cell,
  DropdownItem,
  DropdownMenu,
  Field,
  Icon,
  WaterfallFlow,
} from "@antmjs/vantui";
import classNames from "classnames";
import Taro, { useReachBottom } from "@tarojs/taro";
import { useRef, useState, useEffect } from "react";
import searchImg from "@/assets/images/common/search.png";
import CardProductListItem from "@/components/card/productListItem";
import { productPage } from "@/apis/product";
import { IProduct, IProductParams } from "@/types/product";
import { randomId } from "@/common/verifyUtils";
import "./index.less";

export default function ProductSearch() {
  const [pageInfo] = useState({
    total: 10,
    offset: 1,
    limit: 10,
  });

  const [list, setList] = useState<IProductParams[]>([]);
  const [searchList] = useState([
    {
      text: "全部商品",
      value: 0,
      icon: searchImg,
    },
    {
      text: "新款商品",
      value: 1,
      icon: searchImg,
    },
    {
      text: "活动商品",
      value: 2,
      icon: searchImg,
    },
  ]);
  const searchListRef = useRef<{
    toggle: () => void;
  } | null>(null);

  const renderItem = (item: IProduct) => {
    return (
      <CardProductListItem
        item={{
          id: item.id,
          url: item.data,
          desc: item.name,
          // typeName: item.typeName,
        }}
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/myWorks/marketingTabs/index?id=${item.categoryId}`,
          })
        }
      />
    );
  };

  //搜索产品
  const searchResule = (e?: string | undefined) => {
    productPage({ name: e ? e : "", type: "resource" }).then((res) => {
      setList(
        res.map((w, index) => ({
          key: randomId(),
          ...w,
          isCutPrice: index % 2 === 0 ? true : false,
        }))
      );
    });
  };

  /**
   * 获取列表数据
   */

  useEffect(() => {
    searchResule();
  }, []);

  //上拉刷新
  useReachBottom(() => {
    const { total, offset, limit } = pageInfo;
    if (total > offset * limit) {
      searchResule();
    }
  });
  const searchElement = () => {
    return (
      <Field
        clearable
        className="product-search-wrap"
        placeholder="搜索产品名称"
        rightIcon={searchImg}
        onBlur={(e) => {
          searchResule(e.detail);
        }}
      />
    );
  };

  // 搜索列表toogle
  const handleSearchListToggle = () => {
    searchListRef.current!.toggle();
  };

  //
  const handleClickSearchListCell = () => {
    handleSearchListToggle();
  };
  // 搜索列表
  const searchListElement = () => {
    return (
      <DropdownMenu>
        <DropdownItem titleClass="none" ref={searchListRef}>
          <View className="search-list-item-wrap">
            {searchList.map((searchListItem, idx) => (
              <Cell
                key={searchListItem.value}
                border={false}
                className={classNames({
                  '"search-list-item-active"': idx === 1,
                })}
                renderIcon={<Icon name={searchListItem.icon}></Icon>}
                renderTitle={
                  <View className="search-list-item-label">
                    北京朝阳大悦城
                    <Text className="search-list-item-label-active">
                      空气机
                    </Text>
                    合拍
                  </View>
                }
                onClick={() => handleClickSearchListCell()}
              ></Cell>
            ))}
          </View>
        </DropdownItem>
      </DropdownMenu>
    );
  };

  const tabsELement = () => {
    return (
      <View className="my-works-tab-wrap">
        <View className="my-works-tab my-works-tab-active">按产品分类</View>
        <View
          className="my-works-tab"
          onClick={() =>
            Taro.navigateTo({ url: "/pages/myWorks/marketingTabsLatest/index" })
          }
        >
          最近生成
        </View>
      </View>
    );
  };
  return (
    <View className="wrap-container-space-16 dropwn-menu-height-none">
      {searchElement()}
      {searchListElement()}
      {tabsELement()}
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
