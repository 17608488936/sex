import { Image, Text, View } from "@tarojs/components";
import { Icon, Popup, WaterfallFlow } from "@antmjs/vantui";
import { useEffect, useState, startTransition } from "react";
import classNames from "classnames";
import searchImg from "@/assets/images/common/search.png";
import Taro, { useReachBottom } from "@tarojs/taro";
import CardProductListItem from "@/components/card/productListItem";
import { productCategories, productPage } from "@/apis/product";
import { IProduct, IProductCategories, IProductParams } from "@/types/product";
import BaseEmptyWrap from "@/components/base/baseEmptyWrap";
import "./index.less";

export default function ProductList() {
  const [list, setList] = useState<
    (IProduct & { key: IProduct["id"]; isCutPrice: boolean })[]
  >([]);
  const [tagType, setTagType] = useState("热门");
  const [pageInfo] = useState({
    total: 10,
    offset: 0,
    limit: 10,
  });
  const [productCategory, setProductCategory] = useState<IProductCategories[]>(
    []
  );
  const [productCategoryIdx, setProductCategoryIdx] = useState(-1);
  const [productCategoryShow, setProductCategoryShow] = useState(false);

  useEffect(() => {
    getProductCategory();
  }, []);
  useEffect(() => {
    if (productCategoryIdx !== -1) {
      getProductPage({ categoryId: productCategory[productCategoryIdx]._id });
    }
  }, [productCategoryIdx]);
  const getProductCategory = () => {
    productCategories().then((res) => {
      setProductCategory(res);
      getProductPage({ tag: [tagType] });
    });
  };
  const getProductPage = async (params: IProductParams) => {
    const res = await productPage({
      type: "resource",
      ...params,
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

  const headELement = () => {
    return (
      <View className="product-list-sticky">
        <View
          className="product-list-search-wrap"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/product/search/index",
            });
          }}
        >
          <View>搜索产品名称</View>
          <Image fadeIn src={searchImg} className="product-list-search-img" />
        </View>
        <View className="product-list-title-wrap">
          <View className="product-list-title">{tagType}产品列表</View>
          <View
            className="product-list-title-arrow-wrap"
            onClick={() => setProductCategoryShow(true)}
          >
            <View>查看全部产品分类</View>
            <Icon name="arrow" />
          </View>
        </View>
      </View>
    );
  };

  /**
   * 获取列表数据
   */
  const getPageList = async () => {};
  //上拉刷新
  useReachBottom(() => {
    const { total, offset, limit } = pageInfo;
    if (total > offset * limit) {
      getPageList();
    }
  });
  useEffect(() => {
    if (productCategoryIdx !== -1) {
    }
  }, [productCategoryIdx]);
  const handleClickProductTag = (idx: number) => {
    startTransition(() => {
      setTagType(productCategory[idx].name);
      setProductCategoryIdx(idx);
      setProductCategoryShow(false);
    });
  };
  const popupElement = () => {
    return (
      <Popup
        round
        show={productCategoryShow}
        position="top"
        onClose={() => setProductCategoryShow(false)}
      >
        <View className="product-list-popup-content">
          {productCategory.map((item, idx) => (
            <View
              key={item._id}
              className={classNames("product-list-popup-content-tag", {
                "product-list-popup-content-tag-active":
                  idx === productCategoryIdx,
              })}
              onClick={() => handleClickProductTag(idx)}
            >
              {item.name}
            </View>
          ))}
          <View className="product-list-popup-content-retract-wrap">
            <Text onClick={() => setProductCategoryShow(false)}>点击收起</Text>
            <Icon
              name="arrow-up"
              onClick={() => setProductCategoryShow(false)}
            />
          </View>
        </View>
      </Popup>
    );
  };
  return (
    <View className="wrap-container-space-16">
      {headELement()}
      {list.length ? (
        <WaterfallFlow
          dataSource={list}
          columnNum={2}
          gutter={8}
          renderItem={renderItem}
        />
      ) : (
        <BaseEmptyWrap />
      )}

      {popupElement()}
    </View>
  );
}
