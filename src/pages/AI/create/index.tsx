import { View, Text, Button, Image } from "@tarojs/components";
import {
  Icon,
  Popup,
  PopupProps,
  Radio,
  RadioGroup,
  Checkbox,
} from "@antmjs/vantui";
import NavTool from "@/components/base/nav";
import React, { useEffect, useState } from "react";

import BaseVideo from "@/components/base/baseVideo";
import huan from "@/assets/images/common/icon_huan@2x.png";
import PopupImg from "@/assets/images/common/Popup.jpg";
// import scene from '@/assets/images/common/scene.png'
import Taro, { useRouter } from "@tarojs/taro";
import {
  ICreateAIVideoParams,
  IVideoTemplate,
  IVideoResource,
} from "@/types/video";
import { createAIVideo, videoTemplateDetail } from "@/apis/video";
import { TSourceType, uploadVideo } from "@/common/taroUtils";
import BaseButton from "@/components/base/baseButton";
import classNames from "classnames";
import "./index.less";

const aiGender = [
  { text: "原声", type: "no" },
  { text: "使用，AI男声", type: "VC_BV123_streaming" },
  { text: "使用，AI女声", type: "VC_BV001_streaming" },
];

export default function Index() {
  const [upload, setUpload] = React.useState(true);
  const [add, setAdd] = React.useState(false);
  const [usedAi, setUsedAi] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  // const [count] = React.useState(2)
  const [show, setShow] = React.useState(false);
  const [towYes, setTowYes] = useState(false);
  const [threeYes, setThreeYes] = useState(false);
  const [position] = React.useState<PopupProps["position"]>("bottom");

  const [aiType, setAiType] = React.useState<
    ICreateAIVideoParams["voiceType"] | "no"
  >("no"); //是否使用ai配音

  const router = useRouter<{ id: string }>();
  const [detail, setDetail] = useState<IVideoTemplate>({} as IVideoTemplate);
  const [sampleResource, setSampleResource] = useState<
    IVideoTemplate["resource"][number]
  >({} as IVideoTemplate["resource"][number]);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const res = await videoTemplateDetail(router.params.id);
    setDetail(res);
    getSampleVideo(res.resource);
  };

  const showFn = (type: string) => {
    switch (type) {
      case "add":
        setAdd(!add);
        setUsedAi(false);
        setUpload(false);
        break;
      case "upload":
        setUpload(!upload);
        setUsedAi(false);
        setAdd(false);
        break;
      case "usedAi":
        setUsedAi(!usedAi);
        setUpload(false);
        setAdd(false);
        break;
      default:
        break;
    }
  };
  // 获取样品视频
  const getSampleVideo = (resource: IVideoResource[]) => {
    if (resource) {
      const idx = Math.floor(Math.random() * (resource.length - 1));
      const currentSampleResource = resource.filter((w) => !w.replaceable)[idx];
      // console.log(idx, currentSampleResource, "currentSampleResource");

      setSampleResource(currentSampleResource);
    }
  };

  // 上传视频
  const handelUploadVideo = async (sourceType: TSourceType[]) => {
    try {
      const _videoUrl = await uploadVideo(sourceType);
      setVideoUrl(_videoUrl);
    } catch (error) {
      // console.log("_videoUrl 错了", error);
    }
  };
  //上传提示
  const updataAlert = () => {
    return (
      <View className="create_skill_refer">
        <View className="create_skill_refer_title">口播文案参考</View>

        {detail?.contentIntroduceDemo?.map((v) => {
          return (
            <>
              <View className="create_skill_refer_bold">{v.title}</View>
              {v.content.map((val) => (
                <View key={val} className="create_skill_refer_text">
                  {val}
                </View>
              ))}
            </>
          );
        })}
      </View>
    );
  };

  // const createAIVideoDIsabled = () => videoUrl

  const handleCreateAIVideo = async () => {
    if (!videoUrl) {
      Taro.showToast({
        icon: "error",
        title: "请先上传素材",
      });
      return;
    } else if (!towYes) {
      Taro.showToast({
        icon: "error",
        title: "请确认产品素材",
      });
      return;
    } else if (!threeYes) {
      Taro.showToast({
        icon: "error",
        title: "请确认配音",
      });
      return;
    }

    const createAIVideoParams: ICreateAIVideoParams = {
      url: videoUrl,
      templateId: detail._id,
      resourceId: sampleResource._id,
    };
    if (aiType !== "no") {
      createAIVideoParams["voiceType"] = aiType;
    }
    try {
      const res = await createAIVideo(createAIVideoParams);
      if (res?.url) {
        // const webViewUrl = encodeURIComponent(
        //   `http://192.168.2.182:10086/pages/index/index?videoUrl=${res.url}&cover=${res.cover}&videoType=complex&name=${detail.title}`
        // );

        Taro.navigateTo({
          url: `/pages/product/generateVideoMaterial/index?videoUrl=${res.url}&cover=${res.cover}&videoType=complex&name=${detail.title}`,
        });
        return;
      }
      Taro.showToast({ icon: "error", title: "智能生成视频出错，请联系客服" });
    } catch (error) {}
  };
  const setp1ExampleImage = () =>
    detail?.resource?.filter((w: { replaceable: any }) => w.replaceable)[0]
      .video.url;
  return (
    <View className="create">
      <NavTool
        title={detail.title}
        noTopColor="none"
        isShowToTop
        isShowBgColor="#171b27"
        isShowFffbg={false}
      ></NavTool>
      <View className="create-folding_panel">
        <View className="upload_material">
          <View
            className={classNames("upload_material_title close_title", {
              close: !upload,
            })}
            onClick={(e) => {
              e.stopPropagation();
              // setUpload(!upload);
              showFn("upload");
            }}
          >
            <View
              className="upload_material_title_left
            "
            >
              第<Text>1</Text>步
            </View>
            <View className="upload_material_title_right ">
              上传你的拍摄素材
            </View>
            <View
              className="
            upload_material_title_icon
            "
            >
              <>
                {!!videoUrl ? (
                  <Checkbox
                    iconSize="auto"
                    className="checkout-box"
                    checkedColor="#171B27"
                    value
                  />
                ) : (
                  <Icon name="arrow" className="icon"></Icon>
                )}
              </>
            </View>
          </View>
          <View
            className={
              upload
                ? "upload_material_detail"
                : "upload_material_detail close_text"
            }
          >
            <View className="upload_material_detail_right">
              <BaseVideo
                className="upload_material_detail_right_video"
                src={videoUrl || setp1ExampleImage()}
                // poster={videoUrl ? undefined : detail.cover}
              />
              <View className="upload_material_detail_right_text">
                样片参考
              </View>
            </View>
            <View className="upload_material_detail_left">
              {videoUrl ? (
                <View className="upload_material_detail_left_addai">
                  <Button
                    className="upload_material_detail_left_addai_btn_again btn"
                    onClick={() => setShow(true)}
                  >
                    重新添加
                  </Button>
                </View>
              ) : (
                <Button
                  className="upload_material_detail_left_button"
                  onClick={() => setShow(true)}
                >
                  拍摄/上传
                </Button>
              )}
            </View>
          </View>
        </View>
        <View className="upload_material">
          <View
            className={
              add
                ? "upload_material_title close_title"
                : "upload_material_title close_title close"
            }
            onClick={(e: any) => {
              e.stopPropagation();
              // setAdd(!add);
              showFn("add");
              setTowYes(true);
            }}
          >
            <View
              className="upload_material_title_left
            "
            >
              第<Text>2</Text>步{add}
            </View>
            <View className="upload_material_title_right ">添加产品素材</View>
            <View
              className="
            upload_material_title_icon
            "
            >
              {!!towYes ? (
                <Checkbox
                  iconSize="auto"
                  className="checkout-box"
                  checkedColor="#171B27"
                  value
                />
              ) : (
                <Icon name="arrow" className="icon"></Icon>
              )}
            </View>
          </View>
          <View
            className={
              add
                ? "upload_material_detail"
                : "upload_material_detail close_text"
            }
          >
            <View className="upload_material_detail_right">
              <BaseVideo
                className="upload_material_detail_right_video"
                src={sampleResource?.video?.url}
                poster={sampleResource?.video?.cover}
                // poster="https://ts3.cn.mm.bing.net/th?id=OIP-C.jaaU3wr6r5frJM-W3EwP5gHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
              />
              <View className="upload_material_detail_right_text">
                <Button
                  className="upload_material_detail_right_text_btn
                "
                  onClick={() => {
                    getSampleVideo(detail.resource);
                  }}
                >
                  <Image fadeIn src={huan} />
                  换一个
                </Button>
              </View>
            </View>
            <View className="upload_material_detail_left">
              <View className="upload_material_detail_left_text">
                确认产品素材后， 即可进行视频合成
              </View>
            </View>
          </View>
        </View>
        <View className="upload_material">
          <View
            className={
              usedAi
                ? "upload_material_title close_title"
                : "upload_material_title close_title close"
            }
            onClick={(e: any) => {
              e.stopPropagation();
              // setUsedAi(!usedAi);
              showFn("usedAi");
              setThreeYes(true);
            }}
          >
            <View
              className="upload_material_title_left
            "
            >
              第<Text>3</Text>步
            </View>
            <View className="upload_material_title_right ">是否使用AI配音</View>
            <View
              className="
            upload_material_title_icon
            "
            >
              {!!threeYes ? (
                <Checkbox
                  iconSize="auto"
                  className="checkout-box"
                  checkedColor="#171B27"
                  value
                />
              ) : (
                <Icon name="arrow" className="icon"></Icon>
              )}
            </View>
          </View>
          <View
            className={
              usedAi
                ? "upload_material_detail"
                : "upload_material_detail close_text"
            }
          >
            <View className="upload_material_detail_radio">
              <RadioGroup
                direction="horizontal"
                value={aiType}
                onChange={(e: { detail: any }) => {
                  setAiType(e.detail);
                }}
              >
                {aiGender.map((v: { text: any; type: any }) => {
                  return (
                    <Radio
                      iconSize="auto"
                      className="checkout-box"
                      key={v.text}
                      checkedColor="#171a23"
                      name={v.type}
                    >
                      {v.text}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </View>
          </View>
        </View>
      </View>
      <View className="synthesis_btnbox">
        <BaseButton
          className="synthesis_btn"
          color="#789c99"
          round
          onClick={handleCreateAIVideo}
        >
          智能合成视频
        </BaseButton>
      </View>
      <Popup
        round
        show={show}
        position={position}
        onClose={() => setShow(false)}
      >
        <View className="create_skill">
          <View className="create_skill_title_close">
            <Icon
              onClick={() => setShow(false)}
              name="cross"
              className="icon"
            />
          </View>
          <View className="create_skill_title_text">素材拍摄技巧</View>
          <View className="create_skill_draw">
            <View className="create_skill_draw_left">
              <View className="create_skill_draw_left_top">
                {detail?.teaching?.[0]?.cover ? "教学视频" : "画面技巧"}
              </View>
              <View className="create_skill_draw_left_bottom">
                {detail?.teaching?.[0]?.title ||
                  "1.一个背景干净、产品充分露出的背景"}
              </View>
              <View className="create_skill_draw_left_bottom">
                {detail?.teaching?.[0]?.title
                  ? "上传竖版视频效果更佳"
                  : "2.上传竖版视频效果更佳"}
              </View>
            </View>
            <View className="create_skill_draw_right">
              <View className="create_skill_draw_right_bigimg">
                {
                  detail?.teaching?.[0]?.url ? (
                    <BaseVideo
                      className="img"
                      poster={detail?.teaching?.[0]?.cover}
                      src={detail?.teaching?.[0]?.url}
                    />
                  ) : (
                    <>
                      <Image fadeIn className="img" src={PopupImg} />
                      {/* {count >= 2 ? (
                        <View className="create_skill_draw_right_smimg">
                          <Image className="create_skill_draw_right_smimg_image" fadeIn src={scene} />+{count}
                        </View>
                      ) : null} */}
                    </>
                  )
                  // count >= 2 ? (
                  //   <View className="create_skill_draw_right_smimg">
                  //     <Image className="create_skill_draw_right_smimg_image" fadeIn src={scene} />+{count}
                  //   </View>
                  // ) : null
                }
              </View>
            </View>
          </View>

          <>{updataAlert()}</>
          <View className="create_skill_btnbox">
            <Button
              className="create_skill_btnbox_btn"
              onClick={() => {
                setShow(false);
                handelUploadVideo(["camera"]);
              }}
            >
              立即拍摄
            </Button>
            <Button
              className="create_skill_btnbox_btn"
              onClick={() => {
                setShow(false);
                handelUploadVideo(["album"]);
              }}
            >
              上传素材
            </Button>
          </View>
        </View>
      </Popup>
      <View className=""></View>
    </View>
  );
}
