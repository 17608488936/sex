import { Button, Image, View } from "@tarojs/components";
import noauth from "@/assets/images/common/noauth.png";
import ewm from "@/assets/images/common/ewm.png";
import finish from "@/assets/images/common/finish.jpg";
import { Overlay, Icon } from "@antmjs/vantui";
import React, { useEffect } from "react";
import { authQrcode, douyinResult } from "@/apis/user";
import Taro from "@tarojs/taro";
import "./index.less";

export default function Authorize() {
  const [show, setShow] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [ewmimg, setEwmimg] = React.useState(ewm);

  useEffect(() => {
    if (isAuth) {
      refreshFn();
    }
    // createNotification("zzzzzzzz");
  }, [isAuth]);
  function refreshFn() {
    authQrcode().then((res) => {
      const url =
        "data:image/pngvscode-file://vscode-app/private/var/folders/vv/879p12cs6x94hb9mvr6xfrd40000gn/T/AppTranslocation/C4403C74-276E-4DF6-8998-DE85E3CDE6F2/d/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html;base64," +
        Taro.arrayBufferToBase64(res);
      setEwmimg(url);
    });
  }

  async function getDouyinResult() {
    let res = await douyinResult();
    if (res.message == "OK") {
      // setShow(true);
      Taro.navigateTo({ url: "/pages/authorize/detail/index" });
    } else {
      Taro.showToast({ title: res.message, icon: "error" });
      setShow(false);
    }
  }
  return (
    <View className="authorrize">
      {!isAuth ? (
        <View className="unauthorized">
          <View className="unauthorized_img">
            <Image fadeIn src={noauth}></Image>
          </View>
          <View className="unauthorized_text">您暂未完成抖音授权</View>
          <View className="unauthorized_btn">
            <Button
              onClick={() => {
                setIsAuth(true);
              }}
            >
              点击授权
            </Button>
          </View>
        </View>
      ) : (
        <View className="authorizing">
          <View className="authorizing_message">
            注意：二维码仅限1个人使用，如5min未使用，需要刷新一次二维码
          </View>
          <View className="authorizing_auth">
            <View className="authorizing_auth_message">
              <View className="">保存图片至相册后，</View>
              <View className="">打开抖音扫码进行授权</View>
            </View>
            <View className="authorizing_auth_ewm">
              <Image fadeIn src={ewmimg} />
            </View>
            <View className="authorizing_auth_refresh btn">
              <Button
                className=""
                onClick={() => {
                  refreshFn();
                }}
              >
                刷新
              </Button>
            </View>
            <View className="authorizing_auth_finish btn">
              <Button
                onClick={() => {
                  getDouyinResult();
                }}
                className=""
              >
                完成授权
              </Button>
            </View>
          </View>
        </View>
      )}

      <View className="auth_overlay">
        <Overlay show={show}>
          <View className="auth_overlay_wrapper">
            <View className="auth_overlay_wrapper_data">
              <View className="auth_overlay_wrapper_data_close">
                <Icon
                  onClick={() => setShow(false)}
                  name="cross"
                  className="icon"
                ></Icon>
              </View>
              <View className="auth_overlay_wrapper_data_title">恭喜你</View>
              <View className="auth_overlay_wrapper_data_text">
                完成抖音数据授权
              </View>
              <View className="auth_overlay_wrapper_data_img">
                <Image fadeIn className="" src={finish} />
              </View>
              <View className="authorizing_auth_refresh btn">
                <Button className="">查看数据</Button>
              </View>
              <View className="authorizing_auth_finish btn">
                <Button className="">开始创作</Button>
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    </View>
  );
}
