import { View } from "@tarojs/components";
import { Empty, Field, WaterfallFlow } from "@antmjs/vantui";
import Taro, { useReachBottom } from "@tarojs/taro";
import { useState } from "react";
import searchImg from "@/assets/images/common/search.png";
import CardProductListItem from "@/components/card/productListItem";
import { IProduct } from "@/types/product";
import { productPage } from "@/apis/product";
import NavTool from "@/components/base/nav";
import "./index.less";

export default function ProductSearch() {
  const [pageInfo] = useState({
    total: 10,
    offset: 0,
    limit: 30,
  });
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState<
    (IProduct & { key: IProduct["id"]; isCutPrice: boolean })[]
  >([]);

  const renderItem = (item: IProduct) => {
    return (
      <CardProductListItem
        item={{
          id: item.id,
          url: item.data,
          desc: item.name,
          typeName: item.categoryName || "-",
        }}
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/product/selectProduct/index?id=${item.id}`,
          })
        }
      />
    );
  };

  //上拉刷新
  useReachBottom(() => {
    const { total, offset, limit } = pageInfo;
    if (total > offset * limit) {
      getPageList();
    }
  });
  /**
   * 获取列表数据
   */
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getPageList = async (name?: string) => {
    const res = await productPage({
      skip: pageInfo.offset,
      limit: pageInfo.limit,
      type: "resource",
      name,
    });
    setList(
      res.map((w, index) => ({
        key: w.id,
        ...w,
        isCutPrice: index % 2 === 0 ? true : false,
      }))
    );
  };
  const searchElement = () => {
    return (
      <Field
        clearable
        className="product-search-wrap"
        placeholder="搜索产品名称"
        rightIcon={searchImg}
        onClear={() => getPageList()}
        onClickIcon={() => getPageList(searchValue)}
        onInput={(e) => setSearchValue(e.target.value)}
        onConfirm={(e) => getPageList(e.detail)}

        // onFocus={() => handleSearchListToggle()}
      />
    );
  };

  // 搜索列表toogle
  // const handleSearchListToggle = () => {
  //   searchListRef.current!.toggle();
  // };

  //
  // const handleClickSearchListCell = () => {
  //   // handleSearchListToggle();
  // };
  // 搜索列表
  // const searchListElement = () => {
  //   return (
  //     <DropdownMenu>
  //       <DropdownItem titleClass="none" ref={searchListRef}>
  //         <View className="search-list-item-wrap">
  //           {list.map((item, idx) => (
  //             <Cell
  //               key={item.id}
  //               border={false}
  //               className={classNames({
  //                 '"search-list-item-active"': idx === 1,
  //               })}
  //               renderIcon={<Icon name={searchImg}></Icon>}
  //               renderTitle={
  //                 <View className="search-list-item-label">
  //                   {/* {
  //                     item.name.split(name)
  //                   } */}
  //                   北京朝阳大悦城
  //                   <Text className="search-list-item-label-active">
  //                     空气机
  //                   </Text>
  //                   合拍
  //                 </View>
  //               }
  //               onClick={() => handleClickSearchListCell()}
  //             ></Cell>
  //           ))}
  //         </View>
  //       </DropdownItem>
  //     </DropdownMenu>
  //   );
  // };

  const listElement = () => {
    return list.length ? (
      <WaterfallFlow
        dataSource={list}
        columnNum={2}
        gutter={8}
        renderItem={renderItem}
      />
    ) : (
      <Empty image="search" description="暂无搜索数据" />
    );
  };
  return (
    <>
      <NavTool color="#000" title="本次推广产品" isShowToTop />
      <View className="wrap-container-space-16 dropwn-menu-height-none">
        {searchElement()}
        {/* {searchListElement()} */}
        {listElement()}
      </View>
    </>
  );
}
