import { View, Button, Image } from "@tarojs/components";
import { Cell, Dialog } from "@antmjs/vantui";
import BaseBgLogo from "@/components/base/baseBgLogo";
import React, { useCallback, useEffect } from "react";
import BaseDialogContent from "@/components/base/baseDialogContent";
import Taro from "@tarojs/taro";
import { douyinInfo, getUserData } from "@/apis/user";
import { IUserDetail } from "@/types/user";
import { useCapsuleHeight } from "@/hooks/pagePositionCapsuleHooks";
import { clearAllStore } from "@/store/base";
import copyImg from "@/assets/images/common/copy.png";
import { clipboard } from "@/common/taroUtils";

import "./index.less";

const Dialog_ = Dialog.createOnlyDialog();
const myCellList = [
  {
    path: "/pages/myWorks/marketingTabs/index",
    icon: "records",
    text: "我的创作",
  },
  {
    path: "/pages/activity/list/index",
    icon: "notes-o",
    text: "活动话题",
  },
  {
    path: "/pages/authorize/detail/index",
    icon: "friends-o",
    text: "我的授权",
    auth: true,
  },
];
// path: "/pages/myWorks/search/index",

async function getDouyinResult() {
  let res = await douyinInfo();
  if (res.douyinAuthorized) {
    Taro.navigateTo({ url: "/pages/authorize/detail/index" });
  } else {
    Taro.navigateTo({ url: "/pages/authorize/index/index" });
  }
}

export default function My() {
  const [height] = useCapsuleHeight("all");
  useEffect(() => {
    getUserData().then((res) => {
      setUserDetail(res);
    });
  }, []);
  const [userDetail, setUserDetail] = React.useState<IUserDetail>(
    {} as IUserDetail
  );
  const confirm = useCallback(() => {
    Dialog_.alert({
      message: (
        <BaseDialogContent
          leftBtnText="确定"
          leftBtnClick={() => {
            clearAllStore();
            Taro.reLaunch({ url: "/pages/login/index" });
          }}
          rightBtnText="点错了"
          rightBtnClick={() => {
            Dialog_.close();
          }}
        >
          你确定要退出登录吗
        </BaseDialogContent>
      ),
    });
  }, []);

  const cellElement = () =>
    myCellList.map((w) => (
      <Cell
        key={w.path}
        icon={w.icon}
        isLink
        border={false}
        onClick={() => {
          if (w.auth) {
            getDouyinResult();
          } else {
            Taro.navigateTo({ url: w.path });
          }
        }}
        renderTitle={<View className="title">{w.text}</View>}
      />
    ));
  return (
    <View className="my" style={{ paddingTop: Taro.pxTransform(height) }}>
      <View className="my_name_outbtn">
        <View className="my_name_outbtn_text">我的</View>
        <Button
          className="
        my_name_outbtn_btn"
          onClick={() => confirm()}
        >
          退出登录
        </Button>
      </View>
      <View className="my_information">
        <Image
          fadeIn
          className="my_information_avatar"
          src={userDetail.avatar}
        />
        <View className="my_information_two">
          <View className="my_information_blackbg" />
          <View className="my_information_user_name">{userDetail.name}</View>
          <View className="my_information_data">
            <View className="my_information_data_left">
              <View className="my_information_data_left_top">
                <View className="my_information_data_left_top_id">ID</View>
                <View className="my_information_data_left_top_userid">
                  {userDetail.uid}
                </View>

                <Image
                  fadeIn
                  className="my_information_data_left_top_icon"
                  src={copyImg}
                  onClick={() => {
                    clipboard(userDetail.uid);
                  }}
                />
              </View>

              <View className="my_information_data_left_bottom">
                地区：{userDetail.area}
              </View>
            </View>
            <View className="my_information_data_right">
              <View className="my_information_data_right_top">
                <View className="my_information_data_right_top_product_name">
                  {userDetail.company}
                </View>
              </View>
              <View className="my_information_data_right_bottom">
                门店：{userDetail.store}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="my_tool">{cellElement()}</View>
      <BaseBgLogo image="logoImg" />

      {
        // eslint-disable-next-line react/jsx-pascal-case
        <Dialog_ />
      }
    </View>
  );
}
