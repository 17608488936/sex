import { Image, View } from "@tarojs/components";
import classNames from "classnames";
import { Cell, Circle, Overlay, Popup } from "@antmjs/vantui";
import { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import BaseButton from "@/components/base/baseButton";
import { IProduct, TProductDetailType } from "@/types/product";
import { addTask, getChildTask, productPage } from "@/apis/product";
import NavTool from "@/components/base/nav";
import "./index.less";

let timer = -1;
export default function ProductSelectGenerate() {
  const router = useRouter<{
    type: TProductDetailType;
    detailId: string;
    id: string;
  }>();
  const [productDetail, setProductDetail] = useState<IProduct>({} as IProduct);
  const [sceneList, setSceneList] = useState<IProduct[]>([]);
  const [stylesList, setStylesList] = useState<IProduct[]>([]);
  const [generateCountList] = useState([
    { id: 1, name: "1张" },
    { id: 2, name: "2张" },
  ]);
  const [detail, setDetail] = useState<string>();

  const [sceneSelectIdx, setSceneSelectIdx] = useState(-1);
  const [selectStylesIdx, setSelectStylesIdx] = useState(-1);
  const [selectGenerateCountIdx, setSelectGenerateCountIdx] = useState(-1);

  const [progressValue, setprogressValue] = useState(0);
  const [overlayShow, setOverlayShow] = useState(false);
  useEffect(() => {
    getProductDetail();
    getProductScene();
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const getProductDetail = async () => {
    const res = await productPage({
      type: "resource",
      resourceId: router.params.id,
    });
    const det = res[0];
    if (det) {
      // Taro.setNavigationBarTitle({ title: det.name });
      setProductDetail(det);
      setDetail(det.name);
    }
  };
  const getProductScene = async () => {
    const res = await productPage({
      type: "sence",
      resourceId: router.params.detailId,
    });
    if (res?.length) {
      setSceneList(res);
      setSceneSelectIdx(0);
    }
  };
  useEffect(() => {
    if (sceneSelectIdx !== -1) {
      getProductStyle();
    }
  }, [sceneSelectIdx]);
  const getProductStyle = async () => {
    const res = await productPage({
      type: "style",
      senceId: sceneList[sceneSelectIdx].id,
      resourceId: router.params.detailId,
    });
    setStylesList(res);
  };

  const headElement = () => (
    <View className="product-select-generate-head-wrap">
      <Image
        fadeIn
        mode="aspectFit"
        className="product-select-generate-head-img"
        src={productDetail.data}
      />
      <View className="product-select-generate-head-content">
        <View className="product-select-generate-head-content-title">
          您本次推广的产品
        </View>
        <View className="product-select-generate-head-content-desc van-multi-ellipsis--l2">
          {productDetail.name}
        </View>
      </View>
    </View>
  );

  const handleSelectScene = (idx: number) => {
    setSceneSelectIdx(idx);
  };
  const handleSelectStyle = (idx: number) => {
    setSelectStylesIdx(idx);
  };
  const handleSelectGenerateCount = (idx: number) => {
    setSelectGenerateCountIdx(idx);
  };

  // 选择场景
  const selectSceneElement = () => {
    return (
      <>
        <Cell
          title="选择场景"
          titleStyle={{
            fontSize: Taro.pxTransform(17),
          }}
          border={false}
        />
        <View className="scroll-x-auto">
          {sceneList.map((w, idx) => (
            <View
              key={w.id}
              className={classNames("product-select-generate-tag mr-10", {
                "product-select-generate-tag-active": idx === sceneSelectIdx,
              })}
              onClick={() => handleSelectScene(idx)}
            >
              {w.name}
            </View>
          ))}
        </View>
      </>
    );
  };
  // 选择风格
  const selectStylesElement = () => {
    return (
      <>
        <Cell
          title="选择风格"
          titleStyle={{
            fontSize: Taro.pxTransform(17),
          }}
          value="查看更多风格"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/product/list/index",
            })
          }
          border={false}
          isLink
        />
        <View className="product-select-generate-styles-wrap">
          {stylesList.map((w, idx) => (
            <View
              key={w.id}
              className={classNames("product-select-generate-styles", {
                "product-select-generate-styles-active":
                  idx === selectStylesIdx,
              })}
              onClick={() => handleSelectStyle(idx)}
            >
              <Image
                fadeIn
                className="product-select-generate-styles-img"
                src={w.data}
                mode="aspectFit"
              />
              <View className="product-select-generate-styles-desc">
                {w.name}
              </View>
            </View>
          ))}
        </View>
      </>
    );
  };
  // 选择生成数量
  const selectGenerateCountElement = () => {
    return (
      <>
        <Cell
          title="选择生成数量"
          titleStyle={{
            fontSize: Taro.pxTransform(17),
          }}
          border={false}
        />
        <View className="scroll-x-auto">
          {generateCountList.map((w, idx) => (
            <View
              key={w.id}
              className={classNames("product-select-generate-tag mr-10", {
                "product-select-generate-tag-active":
                  idx === selectGenerateCountIdx,
              })}
              onClick={() => handleSelectGenerateCount(idx)}
            >
              {w.name}
            </View>
          ))}
        </View>
      </>
    );
  };
  const mainElement = () => {
    return (
      <View>
        {selectSceneElement()}
        {selectStylesElement()}
        {selectGenerateCountElement()}
      </View>
    );
  };

  const createTask = async () => {
    setOverlayShow(true);
    setprogressValue(0);
    const res = await addTask({
      params: {
        imageCount: generateCountList[selectGenerateCountIdx].id,
        productId: router.params.detailId,
        senceId: sceneList[sceneSelectIdx].id,
        styleId: stylesList[selectStylesIdx].id,
      },
      type: ["image-img", "img-text", "img-video", "img-exp"],
    });
    getProductProgress(res.id);
  };

  const getProductProgress = async (taskId: string) => {
    const _res = await getChildTask({
      taskId: taskId,
      type: "image-img",
    });
    const min = Math.min(..._res.list.map((w) => w.progress));
    if (min !== 1) {
      timer = setTimeout(() => {
        getProductProgress(taskId);
      }, 300) as unknown as number;
    } else {
      setOverlayShow(false);
      const url = `/pages/product/generateImageMaterial/index?taskId=${taskId}&type=${router.params.type}`;
      Taro.navigateTo({
        url: url,
      });
    }
    setprogressValue(min);
  };
  const btnDisabled = () =>
    [sceneSelectIdx, selectStylesIdx, selectGenerateCountIdx].every(
      (w) => w !== -1
    );

  const overlayElement = () => {
    return (
      <Overlay
        zIndex={9999}
        // show={overlayShow}
        show={overlayShow}
        onClick={() => setOverlayShow(false)}
      >
        <View className="progess-wrap">
          <View className="progess-wrap-loading">
            <Circle
              className="progess-wrap-loading"
              size={140}
              value={progressValue * 100}
              text={
                <View className="progress-content-wrap">
                  <View className="progress-content-number">
                    {progressValue * 100}%
                  </View>
                  <View className="progress-content-desc">AI助手生成中</View>
                  <View className="progress-content-icon">...</View>
                </View>
              }
            />
          </View>
          {/* <Circle
            className="progess-wrap-loading"
            // size={280}
            strokeWidth={6}
            value={progressValue * 100}
            color={{
              "0%": "#A1C1C1",
              "100%": "#C6DFDF",
            }}
            text={
              <View className="progress-content-wrap">
                <View className="progress-content-number">
                  {progressValue * 100}%
                </View>
                <View className="progress-content-desc">AI助手生成中</View>
                <View className="progress-content-icon">...</View>
              </View>
            }
          /> */}
        </View>
      </Overlay>
    );
  };
  return (
    <>
      <NavTool color="#000" title={detail as string} isShowToTop />

      <View className="product-select-generate-container">{headElement()}</View>
      <Popup
        safeAreaInsetBottom
        overlay={false}
        className="popup-product-generate-wrap"
        round
        show
        position="bottom"
      >
        <View className="product-select-generate-select-wrap wrap-container-space-16">
          {mainElement()}
        </View>
        <View className="product-generate-footer-wrap">
          <View className="custom-line mb-10"></View>
          <View className="wrap-container-space-16">
            <BaseButton
              disabled={!btnDisabled()}
              round
              onClick={() => createTask()}
            >
              生成商品场景图
            </BaseButton>
          </View>
        </View>
      </Popup>
      {overlayElement()}
    </>
  );
}
